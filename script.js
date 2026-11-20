const lyrics = [
  "Got nothing to hide no more",
  "I don't know where to start",
  "But to show you the shape of my heart",
  "I'm lookin' back on things I've done",
  "I never wanna play the same old part",
  "I'll keep you in the dark",
  "Now let me show you the shape of my heart"
];

const delays = [300, 4000, 9000, 19000, 25500, 31500, 35000];
const colors = ["#e00000", "#b80000", "#ff1111", "#d60000", "#f20b0b", "#b30000", "#e60000"];

const hearts = document.getElementById("hearts");
const particles = document.getElementById("particles");
const playBtn = document.getElementById("playBtn");
const hint = document.getElementById("hint");

let started = false;
let particleTimer;

function addParticle() {
  const p = document.createElement("i");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "%";
  p.style.top = (80 + Math.random() * 30) + "%";
  p.style.setProperty("--particle-color",
    ["#ffb6c1", "#ffc0cb", "#dc143c", "#fff0f5", "#ff69b4", "#ff1493"][Math.floor(Math.random()*6)]
  );
  p.style.setProperty("--duration", (5 + Math.random() * 6) + "s");
  p.style.width = p.style.height = (4 + Math.random() * 7) + "px";
  particles.appendChild(p);
  setTimeout(() => p.remove(), 12000);
}

function showHeart(index) {
  const el = document.createElement("div");
  el.className = "heart" + (lyrics[index].length > 34 ? " long" : "");

  // Safe positions inside the 9:16 viewport.
  const x = 50 + (index % 2 === 0 ? -13 : 13);
  const y = 48 + (index % 3 - 1) * 7;

  el.style.left = `${Math.max(27, Math.min(73, x))}%`;
  el.style.top = `${Math.max(34, Math.min(66, y))}%`;
  el.style.setProperty("--heart-color", colors[index % colors.length]);

  const span = document.createElement("span");
  el.appendChild(span);
  hearts.appendChild(el);

  // Type the lyric into the heart instead of letting text spill outside.
  let n = 0;
  const typeMs = index === 3 ? 65 : 55;
  const typer = setInterval(() => {
    span.textContent = lyrics[index].slice(0, n++);
    if (n > lyrics[index].length) clearInterval(typer);
  }, typeMs);

  setTimeout(() => {
    clearInterval(typer);
    el.remove();
  }, 8000);
}

function start() {
  if (started) return;
  started = true;

  const song = document.getElementById("song");
  song.currentTime = 0;
  song.play().catch(() => {});

  playBtn.classList.add("hidden");
  hint.classList.add("hidden");

  for (let i = 0; i < lyrics.length; i++) {
    setTimeout(() => showHeart(i), delays[i]);
  }

  particleTimer = setInterval(addParticle, 140);
  for (let i = 0; i < 25; i++) setTimeout(addParticle, i * 90);

  setTimeout(() => clearInterval(particleTimer), 45000);
}

playBtn.addEventListener("click", start);
