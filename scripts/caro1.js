const carousel1 = document.querySelectorAll(".js-caro1-div img");

let currentImageIndex = 0;

shiftImages();

function shiftImages() {
  carousel1.forEach((image) => {
    image.classList.remove("show");
  });
  carousel1[currentImageIndex].classList.add("show");
  currentImageIndex++;
  checkLength();
}

function checkLength() {
  if (currentImageIndex === carousel1.length) {
    currentImageIndex = 0;
  }
}

setInterval(shiftImages, 1500);
