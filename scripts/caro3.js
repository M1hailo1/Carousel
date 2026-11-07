const carousel3 = document.querySelectorAll(".js-caro3-div img");
const previous3 = document.querySelector(".js-caro3-left-button");
const next3 = document.querySelector(".js-caro3-right-button");

let currentImageIndex3 = 0;
let click3 = 0;
let interval3;

function shiftImages3() {
  carousel3.forEach((image, index) => {
    for (let i = 1; i <= carousel3.length; i++) {
      image.classList.remove(`caro3-image-${i}`);
    }

    const classIndex = (index + currentImageIndex3) % carousel3.length;
    image.classList.add(`caro3-image-${classIndex + 1}`);
  });
}

function shiftPreviousImage3() {
  if (click3 === 0) {
    currentImageIndex3 =
      (currentImageIndex3 - 1 + carousel3.length) % carousel3.length;
    shiftImages3();
    reRunInterval3();
    click3++;
    setTimeout(() => {
      click3 = 0;
    }, 450);
  }
}

function shiftNextImage3() {
  if (click3 === 0) {
    currentImageIndex3 = (currentImageIndex3 + 1) % carousel3.length;
    shiftImages3();
    reRunInterval3();
    click3++;
    setTimeout(() => {
      click3 = 0;
    }, 450);
  }
}

function reRunInterval3() {
  clearInterval(interval3);

  interval3 = setInterval(() => {
    currentImageIndex3 = (currentImageIndex3 + 1) % carousel3.length;
    shiftImages3();
  }, 2500);
}

reRunInterval3();

previous3.addEventListener("click", shiftPreviousImage3);
next3.addEventListener("click", shiftNextImage3);

const section3 = document.querySelector(".caro3");
let carousel3InView = false;

new IntersectionObserver(([entry]) => {
  carousel3InView = entry.isIntersecting && entry.intersectionRatio >= 0.5;
}, { threshold: 0.5 }).observe(section3);

document.addEventListener("keydown", (event) => {
  if (!carousel3InView || event.defaultPrevented ||
      event.altKey || event.ctrlKey || event.metaKey ||
      event.target.closest("input, textarea, select, [contenteditable]:not([contenteditable='false'])")) return;

  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    if (event.key === "ArrowLeft") shiftPreviousImage3();
    else shiftNextImage3();
  }
});
