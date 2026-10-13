const section = document.querySelector("#baymax-section-01");

if (section) {
  const title = section.querySelector(".chapter-title");
  const letters = section.querySelector(".chapter-title-letters");
  const scene = section.querySelector(".chapter-scene");
  const frames = [...section.querySelectorAll(".chapter-frame")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = value => Math.min(1, Math.max(0, value));

  for (const [index, character] of Array.from("OUCH........").entries()) {
    const letter = document.createElement("span");
    letter.className = "chapter-letter";
    letter.style.animationDelay = `${index * 65}ms`;
    letter.textContent = character;
    letters.append(letter);
  }

  if (reducedMotion.matches) {
    section.classList.add("reduced-motion");
    frames[1].style.opacity = "1";
    title.style.opacity = "1";
  } else {
    let frameRequest = 0;

    const updateProgress = () => {
      frameRequest = 0;
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-section.getBoundingClientRect().top / distance);
      const sceneOpen = clamp((progress - 0.18) / 0.25);
      const titleExit = clamp((progress - 0.16) / 0.16);
      const filmProgress = clamp((progress - 0.38) / 0.62);
      const framePosition = filmProgress * (frames.length - 1);
      const currentFrame = Math.floor(framePosition);
      const frameBlend = framePosition - currentFrame;

      scene.style.clipPath = `inset(${(1 - sceneOpen) * 50}% 0 ${(1 - sceneOpen) * 50}% 0)`;
      title.style.opacity = String(1 - titleExit);
      title.style.transform = `translate3d(${-titleExit * 65}vw, 0, 0)`;

      frames.forEach((frame, index) => {
        let opacity = 0;
        if (index === currentFrame) opacity = 1 - frameBlend;
        if (index === currentFrame + 1) opacity = frameBlend;
        if (currentFrame === frames.length - 1 && index === currentFrame) opacity = 1;
        frame.style.opacity = String(opacity);
        frame.style.transform = `scale(${1.06 - sceneOpen * 0.04})`;
      });
    };

    const requestUpdate = () => {
      if (!frameRequest) frameRequest = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
  }
}
