const carousel1 = document.querySelectorAll(".js-caro1-div img");

let currentImageIndex1 = 0;

shiftImages1();

function shiftImages1() {
  carousel1.forEach((image) => {
    image.classList.remove("show");
  });
  carousel1[currentImageIndex1].classList.add("show");
  currentImageIndex1++;
  checkLength1();
}

function checkLength1() {
  if (currentImageIndex1 === carousel1.length) {
    currentImageIndex1 = 0;
  }
}

setInterval(shiftImages1, 1500);
