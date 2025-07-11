const carousel2 = document.querySelectorAll(".js-caro2-div img");

let currentImageIndex = 0;

shiftImages();

function shiftImages() {
  carousel2.forEach((image) => {
    image.classList.remove("show");
  });
  carousel2[currentImageIndex].classList.add("show");
  currentImageIndex++;
  checkLength();
}

function checkLength() {
  if (currentImageIndex === carousel2.length) {
    currentImageIndex = 0;
  }
}

setInterval(shiftImages, 1500);
