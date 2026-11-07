const carousel4 = document.querySelector(".js-caro4-div");
const images4 = carousel4.querySelectorAll("img");
const angle4 = 360 / images4.length;

const cards4 = Array.from(images4, (image) => {
  const card = document.createElement("div");
  card.className = "caro4-card";
  const back = document.createElement("div");
  back.className = "caro4-back";
  back.setAttribute("aria-hidden", "true");
  image.replaceWith(card);
  card.append(image, back);
  return card;
});

function positionImages4() {
  const radius =
    images4.length > 2
      ? (carousel4.offsetWidth + 24) / (2 * Math.tan(Math.PI / images4.length))
      : carousel4.offsetWidth / 2;

  carousel4.style.setProperty("--radius", `${radius}px`);

  cards4.forEach((card, index) => {
    card.style.transform = `rotateY(${index * angle4}deg) translateZ(${radius}px)`;
  });
}

positionImages4();
new ResizeObserver(positionImages4).observe(carousel4);

let drag4 = null;
let dragAngle4 = 0;

carousel4.addEventListener("pointerdown", (event) => {
  if (
    !event.isPrimary ||
    event.button !== 0 ||
    drag4 ||
    !event.target.closest(".caro4-card")
  )
    return;

  drag4 = { pointerId: event.pointerId, x: event.clientX, angle: dragAngle4 };
  carousel4.classList.add("is-dragging");
  carousel4.setPointerCapture(event.pointerId);
});

carousel4.addEventListener("pointermove", (event) => {
  if (!drag4 || event.pointerId !== drag4.pointerId) return;

  dragAngle4 =
    drag4.angle + ((event.clientX - drag4.x) * angle4) / carousel4.offsetWidth;
  carousel4.style.setProperty("--drag-angle", `${dragAngle4}deg`);
});

function stopDragging4(event) {
  if (!drag4 || event.pointerId !== drag4.pointerId) return;
  drag4 = null;
  carousel4.classList.remove("is-dragging");
  if (carousel4.hasPointerCapture(event.pointerId)) {
    carousel4.releasePointerCapture(event.pointerId);
  }
}

carousel4.addEventListener("pointerup", stopDragging4);
carousel4.addEventListener("pointercancel", stopDragging4);
carousel4.addEventListener("lostpointercapture", stopDragging4);
carousel4.addEventListener("dragstart", (event) => event.preventDefault());
