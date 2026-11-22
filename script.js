// ✏️ Apni photos yahan add karo.
// src: "images/photo1.jpg" jaisa path (images/ folder mein photo rakho)
// Neeche demo ke liye online photos hain, inhe apni photos se badal do.
const photos = [
    { src: "Screenshot_20261120

092404.jpg", title: "Meri photo", tag: "Travel" }
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
