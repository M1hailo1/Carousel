const carousel2 = document.querySelectorAll(".js-caro2 div");

let images = [];

let imageIndex = 0;

function getImages() {
  for (let i = 0; i < carousel2.length; i++) {
    images.push(`https://picsum.photos/800/500?random=${i + 1}`);
  }
}

getImages();

function addImages(index) {
  carousel2.forEach((div, i) => {
    div.innerHTML = "";
    if (i === index) {
      const image = document.createElement("img");
      image.src = images[i];
      image.classList.add("caro2-div-img");
      div.appendChild(image);
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  });
}

function nextImage() {
  imageIndex = (imageIndex + 1) % images.length;
  addImages(imageIndex);
}

function prevImage() {
  imageIndex = (imageIndex - 1 + images.length) % images.length;
  addImages(imageIndex);
}

setInterval(nextImage, 3000);

addImages(imageIndex);
