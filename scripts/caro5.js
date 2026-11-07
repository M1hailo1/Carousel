(() => {
  const root = document.querySelector(".caro5");
  const stage = root.querySelector(".js-caro5-div");
  const images = [...stage.querySelectorAll("img")];
  const dots = root.querySelector(".caro5-dots");
  const play = root.querySelector(".caro5-play");
  const count = root.querySelector(".caro5-count");
  const ambient = root.querySelector(".caro5-ambient");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0;
  let playing = !motion.matches;
  let visible = false;
  let timer;
  let drag = null;
  let suppressClick = false;

  const indicators = images.map((image, index) => {
    image.draggable = false;
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Go to image ${index + 1}`);
    button.addEventListener("click", () => select(index, true));
    dots.append(button);
    return button;
  });

  function render(offset = 0) {
    const width = images[0].offsetWidth;
    images.forEach((image, index) => {
      let distance = (index - current + images.length) % images.length;
      if (distance > images.length / 2) distance -= images.length;
      distance += offset;
      const depth = Math.abs(distance);
      const tilt = Math.max(-1, Math.min(1, distance)) * -42;
      image.style.transform = `translate(-50%, -50%) translateX(${distance * width * 0.63}px) translateZ(${-depth * 180}px) rotateY(${tilt}deg)`;
      image.style.zIndex = String(10 - Math.round(depth * 2));
      image.style.filter = `brightness(${Math.max(0.4, 1 - depth * 0.25)})`;
      image.style.opacity = String(Math.max(0.25, 1 - depth * 0.22));
    });
    indicators.forEach((button, index) => button.setAttribute("aria-current", String(index === current)));
    count.textContent = `${String(current + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
    ambient.style.backgroundImage = `url("${images[current].src}")`;
  }

  function schedule() {
    clearTimeout(timer);
    if (playing && visible && !document.hidden && !drag) {
      timer = setTimeout(() => select(current + 1), 2500);
    }
  }

  function select(index, announce = false) {
    current = (index % images.length + images.length) % images.length;
    count.setAttribute("aria-live", announce ? "polite" : "off");
    render();
    schedule();
  }

  function updatePlay() {
    play.textContent = playing ? "Pause" : "Play";
    play.setAttribute("aria-label", playing ? "Pause autoplay" : "Start autoplay");
    play.setAttribute("aria-pressed", String(playing));
    schedule();
  }

  root.querySelector(".caro5-prev").addEventListener("click", () => select(current - 1, true));
  root.querySelector(".caro5-next").addEventListener("click", () => select(current + 1, true));
  play.addEventListener("click", () => { playing = !playing; updatePlay(); });
  document.addEventListener("keydown", (event) => {
    if (!visible || event.defaultPrevented ||
        event.altKey || event.ctrlKey || event.metaKey ||
        event.target.closest("input, textarea, select, [contenteditable]:not([contenteditable='false'])")) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    select(event.key === "Home" ? 0 : event.key === "End" ? images.length - 1 : current + (event.key === "ArrowRight" ? 1 : -1), true);
  });

  stage.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0 || drag) return;
    drag = { id: event.pointerId, x: event.clientX, delta: 0 };
    suppressClick = false;
    clearTimeout(timer);
    stage.classList.add("is-dragging");
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener("pointermove", (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    drag.delta = event.clientX - drag.x;
    if (Math.abs(drag.delta) > 8) suppressClick = true;
    render(Math.max(-1, Math.min(1, drag.delta / (images[0].offsetWidth * 0.63))));
  });
  function finishDrag(event) {
    if (!drag || drag.id !== event.pointerId) return;
    const delta = drag.delta;
    drag = null;
    stage.classList.remove("is-dragging");
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    const cancelled = event.type !== "pointerup";
    select(current + (!cancelled && Math.abs(delta) > 40 ? (delta < 0 ? 1 : -1) : 0), true);
  }
  stage.addEventListener("pointerup", finishDrag);
  stage.addEventListener("pointercancel", finishDrag);
  stage.addEventListener("lostpointercapture", finishDrag);
  stage.addEventListener("click", (event) => {
    if (suppressClick) { suppressClick = false; return; }
    // Pointer capture retargets clicks to the stage; use the released position.
    const image = document.elementFromPoint(event.clientX, event.clientY);
    const index = images.indexOf(image);
    if (index !== -1) select(index, true);
  });
  stage.addEventListener("dragstart", (event) => event.preventDefault());
  new ResizeObserver(() => render()).observe(stage);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
    schedule();
  }, { threshold: 0.5 }).observe(root);
  document.addEventListener("visibilitychange", schedule);
  motion.addEventListener("change", () => { if (motion.matches) { playing = false; updatePlay(); } });
  render();
  updatePlay();
})();
