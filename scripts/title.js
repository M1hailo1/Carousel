document.querySelectorAll(".title-div .pointer-arrow").forEach((img) => {
  img.addEventListener("click", () => {
    document.querySelector(".caro1").scrollIntoView({ behavior: "smooth" });
  });
});

//napravi animaciju title-a
