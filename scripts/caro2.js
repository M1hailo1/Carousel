const carousel2 = document.querySelectorAll(".js-caro2-div img");

let currentImageIndex2 = 0;

function shiftImages2() {
  carousel2.forEach((image, index) => {
    for (let i = 1; i <= carousel2.length; i++) {
      image.classList.remove(`caro2-image-${i}`);
    }

    const classIndex = (index + currentImageIndex2) % carousel2.length;
    image.classList.add(`caro2-image-${classIndex + 1}`);
  });
  currentImageIndex2 = (currentImageIndex2 + 1) % carousel2.length;
}

setInterval(shiftImages2, 2500);
