const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const expandBtn = document.getElementById("expandBtn");
const coverPanel = document.getElementById("coverPanel");
const seekBar = document.getElementById("seekBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

// Add more tracks here later.
// Example:
// { title: "SONG NAME", audio: "assets/song.mp3", cover: "assets/cover.jpg" }
const playlist = [
  {
    title: "BOUHALI",
    audio: "assets/bouhali.mp3",
    cover: "assets/profile.jpg"
  }
];

let trackIndex = 0;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function loadTrack(index) {
  const track = playlist[index];
  document.getElementById("trackTitle").textContent = track.title;
  audio.src = track.audio;
  document.getElementById("coverArt").src = track.cover;
  audio.load();
}

function updateProgress() {
  const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  seekBar.value = percent;
  seekBar.style.background =
    `linear-gradient(to right, #ffd700 0%, #ffd700 ${percent}%, #ececec ${percent}%, #ececec 100%)`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
}

playBtn.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
    } catch (error) {
      console.warn("Audio could not start:", error);
    }
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => {
  playBtn.textContent = "Ⅱ";
  playBtn.setAttribute("aria-label", "Pause");
});

audio.addEventListener("pause", () => {
  playBtn.textContent = "▶";
  playBtn.setAttribute("aria-label", "Play");
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
  updateProgress();
});

audio.addEventListener("timeupdate", updateProgress);

seekBar.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (Number(seekBar.value) / 100) * audio.duration;
  updateProgress();
});

expandBtn.addEventListener("click", () => {
  const open = coverPanel.classList.toggle("open");
  expandBtn.setAttribute("aria-expanded", String(open));
  expandBtn.textContent = open ? "⌃" : "⌄";
});

audio.addEventListener("ended", () => {
  trackIndex = (trackIndex + 1) % playlist.length;
  loadTrack(trackIndex);
  audio.play().catch(() => {});
});

loadTrack(trackIndex);
