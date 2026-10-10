"""Build a soft, upright Baymax-inspired model and export Blender, OBJ, and PNG.

Run with Blender 4.0+:
    blender --background --python assets/build_baymax_scene.py
"""

from math import cos, pi, sin
from pathlib import Path

import bpy
from mathutils import Vector


ASSETS = Path(__file__).resolve().parent
BLEND = ASSETS / "baymax.blend"
OBJ = ASSETS / "baymax.obj"
PREVIEW = ASSETS / "baymax_preview.png"


def material(name, color, roughness=0.34):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = color
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = color
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Metallic"].default_value = 0
    return mat


def smooth_mesh(obj, mat):
    obj.data.materials.append(mat)
    for face in obj.data.polygons:
        face.use_smooth = True
    return obj


def uv_ellipsoid(name, location, scale, mat, segments=48, rings=32):
    bpy.ops.mesh.primitive_uv_sphere_add(
        segments=segments,
        ring_count=rings,
        location=location,
    )
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return smooth_mesh(obj, mat)


def catmull(points, index, t):
    p0 = Vector(points[max(index - 1, 0)])
    p1 = Vector(points[index])
    p2 = Vector(points[min(index + 1, len(points) - 1)])
    p3 = Vector(points[min(index + 2, len(points) - 1)])
    return 0.5 * (
        2 * p1
        + (-p0 + p2) * t
        + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t
        + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t
    )


def make_tapered_limb(name, points, radii, mat, steps=8, sides=24):
    samples = []
    for section in range(len(points) - 1):
        for step in range(steps):
            t = step / steps
            center = catmull(points, section, t)
            radius = catmull([(r, 0, 0) for r in radii], section, t).x
            samples.append((center, max(radius, 0.015)))
    samples.append((Vector(points[-1]), radii[-1]))

    vertices = []
    faces = []
    for i, (center, radius) in enumerate(samples):
        before = samples[max(i - 1, 0)][0]
        after = samples[min(i + 1, len(samples) - 1)][0]
        tangent = (after - before).normalized()
        width_axis = Vector((0, 1, 0)).cross(tangent).normalized()
        depth_axis = tangent.cross(width_axis).normalized()
        depth_radius = radius * 0.86
        for side in range(sides):
            angle = 2 * pi * side / sides
            vertex = (
                center
                + width_axis * (radius * cos(angle))
                + depth_axis * (depth_radius * sin(angle))
            )
            vertices.append(tuple(vertex))

    for row in range(len(samples) - 1):
        for side in range(sides):
            a = row * sides + side
            b = row * sides + (side + 1) % sides
            c = b + sides
            d = a + sides
            faces.append((a, b, c, d))
    faces.append(tuple(reversed(range(sides))))
    faces.append(tuple((len(samples) - 1) * sides + side for side in range(sides)))

    mesh = bpy.data.meshes.new(name + " mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    return smooth_mesh(obj, mat)


def make_torso(mat):
    # Height, half-width, and depth radius form the gentle, upright pear shape.
    profile = [
        (0.94, 0.62, 0.52),
        (1.02, 0.78, 0.62),
        (1.20, 0.94, 0.73),
        (1.52, 1.04, 0.79),
        (1.96, 1.06, 0.80),
        (2.40, 1.00, 0.75),
        (2.78, 0.84, 0.63),
        (3.08, 0.61, 0.48),
        (3.34, 0.43, 0.37),
        (3.47, 0.26, 0.27),
    ]
    vertices = []
    faces = []
    sides = 64
    samples_per_section = 8
    rings = []
    for section in range(len(profile) - 1):
        for step in range(samples_per_section):
            p = catmull([tuple(row) for row in profile], section, step / samples_per_section)
            rings.append((p.x, max(p.y, 0.01), max(p.z, 0.01)))
    rings.append(profile[-1])

    for height, rx, ry in rings:
        for side in range(sides):
            theta = 2 * pi * side / sides
            vertices.append((rx * cos(theta), ry * sin(theta), height))
    for row in range(len(rings) - 1):
        for side in range(sides):
            a = row * sides + side
            b = row * sides + (side + 1) % sides
            c = b + sides
            d = a + sides
            faces.append((a, b, c, d))
    faces.append(tuple(reversed(range(sides))))
    faces.append(tuple((len(rings) - 1) * sides + side for side in range(sides)))

    mesh = bpy.data.meshes.new("Soft torso mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    torso = bpy.data.objects.new("Baymax | torso", mesh)
    bpy.context.collection.objects.link(torso)
    smooth_mesh(torso, mat)
    subdiv = torso.modifiers.new("Silhouette smoothing", "SUBSURF")
    subdiv.levels = 2
    bpy.context.view_layer.objects.active = torso
    bpy.ops.object.modifier_apply(modifier=subdiv.name)
    return torso


def point_at(obj, target):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()


def add_area_light(name, location, power, size, target=(0, 0, 2.0)):
    bpy.ops.object.light_add(type="AREA", location=location)
    light = bpy.context.object
    light.name = name
    light.data.energy = power
    light.data.shape = "DISK"
    light.data.size = size
    point_at(light, target)


def build_character(white, black, badge):
    body_parts = [make_torso(white)]

    # Short, separated legs tuck under the lower edge of the torso.
    body_parts.append(uv_ellipsoid("Baymax | left leg", (-0.35, 0, 0.50), (0.40, 0.45, 0.58), white))
    body_parts.append(uv_ellipsoid("Baymax | right leg", (0.35, 0, 0.50), (0.40, 0.45, 0.58), white))

    for side, label in ((-1, "left"), (1, "right")):
        points = [
            (side * 0.50, 0.0, 3.12),
            (side * 0.75, 0.0, 2.90),
            (side * 0.96, -0.005, 2.55),
            (side * 1.10, -0.015, 1.98),
            (side * 1.16, -0.035, 1.40),
            (side * 1.16, -0.055, 1.02),
        ]
        body_parts.append(
            make_tapered_limb(
                "Baymax | " + label + " arm",
                points,
                (0.13, 0.17, 0.18, 0.17, 0.15, 0.14),
                white,
            )
        )
        body_parts.append(uv_ellipsoid("Baymax | " + label + " mitten palm", (side * 1.16, -0.06, 0.88), (0.25, 0.28, 0.25), white))
        body_parts.append(uv_ellipsoid("Baymax | " + label + " thumb", (side * 1.37, -0.075, 0.92), (0.12, 0.15, 0.16), white, 32, 24))
        for finger_index, (offset, height) in enumerate(((-0.14, 0.70), (0, 0.66), (0.14, 0.70)), start=1):
            body_parts.append(
                uv_ellipsoid(
                    "Baymax | " + label + " finger " + str(finger_index),
                    (side * (1.16 + offset), -0.07, height),
                    (0.10, 0.12, 0.13),
                    white,
                    32,
                    24,
                )
            )

    # Join and voxel-remesh only the soft white suit pieces.
    bpy.ops.object.select_all(action="DESELECT")
    for part in body_parts:
        part.select_set(True)
    bpy.context.view_layer.objects.active = body_parts[0]
    bpy.ops.object.join()
    body = bpy.context.object
    body.name = "Baymax | soft suit"
    remesh = body.modifiers.new("Inflatable seamless suit", "REMESH")
    remesh.mode = "VOXEL"
    remesh.voxel_size = 0.035
    bpy.ops.object.modifier_apply(modifier=remesh.name)
    smooth = body.modifiers.new("Soft transitions", "SMOOTH")
    smooth.factor = 0.8
    smooth.iterations = 7
    bpy.ops.object.modifier_apply(modifier=smooth.name)
    for face in body.data.polygons:
        face.use_smooth = True

    # Rounded pill head, set close to the sloped shoulders.
    uv_ellipsoid("Baymax | pill head", (0, 0, 3.77), (0.39, 0.325, 0.28), white)

    # Two small eyes linked by the signature thin horizontal line.
    for x, name in ((-0.145, "left eye"), (0.145, "right eye")):
        uv_ellipsoid("Baymax | " + name, (x, -0.326, 3.795), (0.041, 0.026, 0.041), black, 32, 24)
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=24,
        radius=0.012,
        depth=0.285,
        location=(0, -0.332, 3.795),
        rotation=(0, pi / 2, 0),
    )
    bridge = bpy.context.object
    bridge.name = "Baymax | eye connector"
    smooth_mesh(bridge, black)

    # Very subtle circular chest detail, kept low contrast like the reference.
    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.055,
        minor_radius=0.005,
        major_segments=48,
        minor_segments=8,
        location=(0.39, -0.59, 2.78),
        rotation=(pi / 2, 0, 0),
    )
    badge_ring = bpy.context.object
    badge_ring.name = "Baymax | subtle chest mark"
    smooth_mesh(badge_ring, badge)


def main():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)

    white = material("Soft white vinyl", (0.94, 0.96, 0.98, 1), 0.3)
    black = material("Graphite eyes", (0.008, 0.012, 0.016, 1), 0.5)
    badge = material("Subtle chest mark", (0.76, 0.80, 0.83, 1), 0.5)
    build_character(white, black, badge)

    bpy.ops.object.camera_add(location=(0.72, -12, 2.35))
    camera = bpy.context.object
    camera.name = "Baymax portrait camera"
    point_at(camera, (0, 0, 2.02))
    camera.data.type = "ORTHO"
    camera.data.ortho_scale = 4.45
    bpy.context.scene.camera = camera

    add_area_light("Large soft key", (3.2, -5.5, 6.0), 430, 4.2)
    add_area_light("Front fill", (-4.0, -4.0, 3.3), 260, 3.5)
    add_area_light("Gentle rim", (1.0, 2.5, 5.3), 440, 3.0)

    scene = bpy.context.scene
    try:
        scene.render.engine = "BLENDER_EEVEE_NEXT"
    except TypeError:
        scene.render.engine = "BLENDER_EEVEE"
    scene.render.resolution_x = 800
    scene.render.resolution_y = 1000
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.film_transparent = True
    scene.render.filepath = str(PREVIEW)
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "AgX - Medium High Contrast"
    scene.view_settings.exposure = 0
    scene.view_settings.gamma = 1
    scene.world.color = (0.08, 0.10, 0.13)

    # Export the finished character meshes as a portable OBJ with its materials.
    bpy.ops.object.select_all(action="DESELECT")
    for obj in scene.objects:
        if obj.type == "MESH" and obj.name.startswith("Baymax | "):
            obj.select_set(True)
    bpy.context.view_layer.objects.active = bpy.data.objects["Baymax | soft suit"]
    bpy.ops.wm.obj_export(
        filepath=str(OBJ),
        export_selected_objects=True,
        export_materials=True,
        export_normals=True,
        export_smooth_groups=True,
        up_axis="Z",
        forward_axis="NEGATIVE_Y",
    )

    bpy.ops.wm.save_as_mainfile(filepath=str(BLEND))
    bpy.ops.render.render(write_still=True)
    print(f"Saved Blender scene: {BLEND}")
    print(f"Exported OBJ model: {OBJ}")
    print(f"Rendered preview: {PREVIEW}")


if __name__ == "__main__":
    main()
