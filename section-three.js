const messages = [
  "That’s good to hear. I’m here whenever you need me.",
  "Thanks for sharing. I’m right here with you.",
  "I hear you. We can take this one step at a time.",
  "Thank you for letting me know. You’re not alone.",
  "That sounds uncomfortable. I’m here to listen.",
  "I’m sorry you’re hurting. I’m here with you.",
  "That sounds tough. Thank you for telling me.",
  "I hear how hard this feels. We can take a moment together.",
  "That sounds very painful. I’m here to support you.",
  "I hear how much you’re hurting. Please reach out to someone nearby for support.",
];

const mouths = [
  "M23 57 Q50 91 77 57",
  "M24 57 Q50 86 76 57",
  "M24 60 Q50 83 76 60",
  "M25 66 Q50 72 75 66",
  "M25 68 Q50 73 75 68",
  "M25 69 L75 69",
  "M25 72 Q50 61 75 72",
  "M24 73 Q50 57 76 73",
  "M24 76 Q50 48 76 76",
  "M25 66 Q50 51 75 66 L75 76 Q50 63 25 76 Z",
];

function faceMarkup(rating) {
  const color = rating < 6 ? "#ffe52e" : rating < 9 ? "#ffae35" : "#ef3e42";
  const mouthFill = rating === 10 ? "#111" : "none";
  const teeth = rating === 10
    ? `<path d="M38 66v8 M50 63v12 M62 65v9" stroke="${color}" stroke-width="3"/>`
    : "";

  return `<svg class="pain-face-art" viewBox="0 0 100 100" aria-hidden="true">
    <defs><linearGradient id="face-${rating}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff49a"/><stop offset=".28" stop-color="${color}"/>
      <stop offset="1" stop-color="${rating < 9 ? "#f2c91d" : "#cf202e"}"/>
    </linearGradient></defs>
    <circle cx="50" cy="50" r="46" fill="url(#face-${rating})" stroke="#111" stroke-width="5"/>
    <circle cx="35" cy="39" r="4.7" fill="#111"/><circle cx="65" cy="39" r="4.7" fill="#111"/>
    <path d="${mouths[rating - 1]}" fill="${mouthFill}" stroke="#111" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    ${teeth}<path d="M15 31 A38 38 0 0 1 43 13" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}

const scale = document.querySelector(".pain-scale");
const response = document.querySelector(".pain-response");

if (scale && response) {
  scale.innerHTML = messages.map((_, index) => {
    const rating = index + 1;
    return `<button class="pain-choice" type="button" aria-label="${rating} out of 10" aria-pressed="false" style="--choice-index:${index}">
      ${faceMarkup(rating)}<span>${rating}</span>
    </button>`;
  }).join("");

  scale.addEventListener("click", event => {
    const choice = event.target.closest(".pain-choice");
    if (!choice) return;

    scale.querySelectorAll(".pain-choice").forEach(button => {
      const selected = button === choice;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    response.textContent = messages[Number(choice.querySelector("span").textContent) - 1];
  });
}
