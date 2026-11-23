const photos = [
  { src: "https://picsum.photos/id/1015/800/1000", title: "River valley", tag: "Nature" },
  { src: "https://picsum.photos/id/1011/800/600", title: "Canoe", tag: "Nature" },
  { src: "https://picsum.photos/id/1031/800/1100", title: "Street", tag: "City" },
  { src: "https://picsum.photos/id/1040/800/700", title: "Castle", tag: "Travel" },
  { src: "https://picsum.photos/id/1043/800/1000", title: "Forest path", tag: "Nature" },
  { src: "https://picsum.photos/id/1056/800/600", title: "Skyline", tag: "City" },
  { src: "https://picsum.photos/id/1067/800/900", title: "Mountains", tag: "Travel" },
  { src: "https://picsum.photos/id/1074/800/650", title: "Lion", tag: "Animals" },
  { src: "https://picsum.photos/id/1084/800/1000", title: "Glacier", tag: "Travel" }
];

const gallery = document.getElementById("gallery");
const filters = document.getElementById("filters");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbCap = document.getElementById("lb-cap");

let visible = photos;
let current = 0;

function render() {
  gallery.innerHTML = "";
  visible.forEach((p, i) => {
    const btn = document.createElement("button");
    btn.setAttribute("aria-label", "Open " + p.title);
    const img = document.createElement("img");
    img.src = p.src;
    img.alt = p.title;
    img.loading = "lazy";
    btn.appendChild(img);
    btn.addEventListener("click", () => open(i));
    gallery.appendChild(btn);
  });
}

function buildFilters() {
  const tags = ["All", ...new Set(photos.map(p => p.tag))];
  tags.forEach(tag => {
    const b = document.createElement("button");
    b.textContent = tag;
    b.setAttribute("aria-pressed", tag === "All");
    b.addEventListener("click", () => {
      visible = tag === "All" ? photos : photos.filter(p => p.tag === tag);
      filters.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
      render();
    });
    filters.appendChild(b);
  });
}

function show() {
  const p = visible[current];
  lbImg.src = p.src;
  lbImg.alt = p.title;
  lbCap.textContent = p.title;
}

function open(i) {
  current = i;
  show();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function close() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function step(d) {
  current = (current + d + visible.length) % visible.length;
  show();
}

lightbox.querySelector(".lb-close").addEventListener("click", close);
lightbox.querySelector(".lb-prev").addEventListener("click", () => step(-1));
lightbox.querySelector(".lb-next").addEventListener("click", () => step(1));
lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });

document.addEventListener("keydown", e => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});

buildFilters();
render();
