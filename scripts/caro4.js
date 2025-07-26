const carousel4 = document.querySelectorAll(".js-caro4-div img");
const total4 = carousel4.length;
let currentImageIndex4 = 0;

function shiftImages4() {
  const angle = 360 / total4;
  carousel4.forEach((image, index) => {
    image.style.transform = `rotateY(${index * angle}deg) translateZ(550px)`;
  });
}

function rotateImages4() {
  const angle = 360 / total4;
  document.querySelector(
    ".js-caro4-div"
  ).style.transform = `translateZ(-500px) rotateY(${
    -currentImageIndex4 * angle
  }deg)`;
}

shiftImages4();
rotateImages4();

setInterval(() => {
  currentImageIndex4 = (currentImageIndex4 + 1) % total4;
  rotateImages4();
}, 1000);
