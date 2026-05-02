const heartsContainer = document.body;
const imageFiles = [
  "https://media1.tenor.com/m/Z4uOqI4Q7UIAAAAd/happy-birthday.gif",
  "https://media1.tenor.com/m/m1OSt0yT908AAAAd/chipi-chipi-chapa-chapa.gif",
  "https://media1.tenor.com/m/dITrI7tD_zAAAAAd/party-parrot.gif",
  "https://media1.tenor.com/m/bE6LwJ75y9EAAAAd/cat-vibing.gif",
  "https://media1.tenor.com/m/o68b3zG14x8AAAAd/dance.gif",
  "https://media1.tenor.com/m/8Yw2rS8R53EAAAAd/dog-meme.gif",
  "https://media1.tenor.com/m/5G32h5Ue2_EAAAAd/funny-animals-dog.gif",
  "https://media1.tenor.com/m/1M99182z4Z0AAAAd/happy-birthday-funny.gif",
  "https://media1.tenor.com/m/qV6t1j_A8pEAAAAd/happy-birthday-to-you.gif",
  "https://media1.tenor.com/m/_kR605zG52UAAAAd/mr-bean.gif"
];

let letterText = [];

async function loadLetter() {
  try {
    const response = await fetch("style/letter.txt?v=2");
    const text = await response.text();
    letterText = text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p !== "");
  } catch (error) {
    console.error("Error loading letter.txt:", error);
    letterText = ["Mãi yêu em ❤️"];
  }
}

loadLetter();

const songs = [
  {
    title: "Happy Birthday Minions",
    cover: "https://media.tenor.com/yjJSxStyYpsAAAAC/napoleon-dynamite-party-animal.gif",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Happy Birthday Funny",
    cover: "https://media.tenor.com/-FrqxFH5EKYAAAAC/happy-birthday.gif",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "APT. - ROSÉ & Bruno Mars",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/2d/1a/7d/2d1a7d91-587e-0ceb-d434-327bd66d9e86/075679628312.jpg/100x100bb.jpg",
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/22/8a/a1/228aa1a0-cbfd-ac14-ae99-09ca59bcc80b/mzaf_12121445588963961343.plus.aac.p.m4a",
  },
  {
    title: "Espresso - Sabrina Carpenter",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/57/e8/7b/57e87ba0-5057-9bb9-c247-ce7dbe426e89/24UMGIM55213.rgb.jpg/100x100bb.jpg",
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e9/4d/02/e94d0230-11ee-ef94-d2cf-a5d547bd73f4/mzaf_554140808559155562.plus.aac.p.m4a",
  },
  {
    title: "Die With A Smile - Lady Gaga & Bruno Mars",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/11/ae/f2/11aef294-f57c-bab9-c9fc-529162984e62/24UMGIM85348.rgb.jpg/100x100bb.jpg",
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e9/d1/46/e9d14699-9505-493e-cd27-a501095c81ff/mzaf_7283388936457278756.plus.aac.p.m4a",
  }
];

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  const icons = ["🎈", "🎂", "🎉", "🎁", "🥳", "✨"];
  const gifs = [
    "https://media.tenor.com/lJufT9_zGMoAAAAC/happy-dance-chris-farley.gif",
    "https://media.tenor.com/10WV2-Tp8y0AAAAC/happy-birthday.gif",
    "https://media.tenor.com/c9HMFjqw1uEAAAAC/dancing-boy-cowboy.gif",
    "https://media.tenor.com/ttDeZJ3hMLsAAAAC/dancing-cat-dance.gif",
  ];

  const isGif = Math.random() > 0.5;

  if (isGif) {
    const img = document.createElement("img");
    img.src = gifs[Math.floor(Math.random() * gifs.length)];
    const gifSize = Math.random() * 30 + 30;
    img.style.width = `${gifSize}px`;
    img.style.height = "auto";
    heart.appendChild(img);
  } else {
    heart.innerText = icons[Math.floor(Math.random() * icons.length)];
    const size = Math.random() * 20 + 10;
    heart.style.fontSize = `${size}px`;
  }

  const left = Math.random() * 100;
  const duration = Math.random() * 3 + 3;
  const opacity = Math.random() * 0.5 + 0.5;

  heart.style.left = `${left}%`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.opacity = opacity;
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

for (let i = 0; i < 10; i++) {
  setTimeout(createHeart, Math.random() * 3000);
}

setInterval(createHeart, 400);

const btnLetter = document.getElementById("btn-letter");
const letterOverlay = document.getElementById("letter-overlay");
const closeLetter = document.getElementById("close-letter");
const letterBody = document.getElementById("letter-body");

let typingInterval;
let paragraphIndex = 0;
let charIndex = 0;
let isTyping = false;

function typeWriter() {
  if (paragraphIndex < letterText.length) {
    isTyping = true;
    let p = letterBody.lastElementChild;
    if (!p || charIndex === 0) {
      p = document.createElement("p");
      if (paragraphIndex === letterText.length - 1) {
        p.classList.add("letter-footer");
      }
      letterBody.appendChild(p);
    }

    p.textContent += letterText[paragraphIndex][charIndex];
    charIndex++;
    letterBody.scrollTop = letterBody.scrollHeight;

    if (charIndex < letterText[paragraphIndex].length) {
      typingInterval = setTimeout(typeWriter, 30);
    } else {
      paragraphIndex++;
      charIndex = 0;
      typingInterval = setTimeout(typeWriter, 500);
    }
  } else {
    isTyping = false;
  }
}

btnLetter.addEventListener("click", () => {
  letterOverlay.classList.add("active");

  if (!isTyping && paragraphIndex < letterText.length) {
    setTimeout(typeWriter, 500);
  }
});

closeLetter.addEventListener("click", () => {
  letterOverlay.classList.remove("active");
  clearTimeout(typingInterval);
  isTyping = false;
});

const btnMusic = document.getElementById("btn-music");
const musicOverlay = document.getElementById("music-overlay");
const closeMusic = document.getElementById("close-music");
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const albumArt = document.querySelector("#album-art img");
const songListContainer = document.getElementById("song-list");

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
  songTitle.innerText = song.title;
  songArtist.style.display = "none";
  albumArt.src = song.cover;
  audioPlayer.src = song.src;
  updateSongListUI();
}

function updateSongListUI() {
  const items = document.querySelectorAll(".song-item");
  items.forEach((item, index) => {
    if (index === songIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

function playSong() {
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  audioPlayer.play();
  console.log("Bản quyền thuộc về Dr.Gifter");
  console.log("Tiktok: https://www.tiktok.com/@dr.gifter306");
  console.log("Github: https://github.com/DrGifter");
}

function pauseSong() {
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  audioPlayer.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  if (isNaN(duration)) return;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  currentTimeEl.innerText = formatTime(currentTime);
  durationEl.innerText = formatTime(duration);
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;
  audioPlayer.currentTime = (clickX / width) * duration;
}

// Populate Song List
songs.forEach((song, index) => {
  const item = document.createElement("div");
  item.classList.add("song-item");
  item.innerHTML = `
    <img src="${song.cover}" alt="${song.title}">
    <div class="song-item-info">
      <div class="song-item-title">${song.title}</div>
    </div>
  `;
  item.addEventListener("click", () => {
    songIndex = index;
    loadSong(songs[songIndex]);
    playSong();
  });
  songListContainer.appendChild(item);
});

const btnImage = document.getElementById("btn-image");
const imageOverlay = document.getElementById("image-overlay");
const closeImage = document.getElementById("close-image");
const statsContainer = document.getElementById("stats-container");

const friendshipStats = [
  {
    label: "Tốc độ rep tin nhắn",
    value: "0.001s",
    icon: "⚡",
    note: "Chỉ áp dụng khi có drama, còn lại thì hên xui."
  },
  {
    label: "Khả năng hiểu ý",
    value: "1/10",
    icon: "🧠",
    note: "Nói một đằng hiểu một nẻo."
  },
  {
    label: "Chỉ số \"Báo\"",
    value: "99%",
    icon: "⚠️",
    note: "Luôn là nguồn cơn của mọi rắc rối nhưng rất vui."
  },
  {
    label: "Dung lượng ảnh dìm",
    value: "128GB",
    icon: "💾",
    note: "Luôn có sẵn 1 kho ảnh 'xấu lạ' để tống tiền khi cần."
  },
  {
    label: "Tần suất nói 'mai học'",
    value: "50 lần/tuần",
    icon: "📚",
    note: "Nhưng chưa bao giờ tới 'mai'."
  },
  {
    label: "Chỉ số 'giữ bí mật'",
    value: "6/10",
    icon: "🤫",
    note: "Bí mật là để chia sẻ cho vui 😜"
  },
  {
    label: "Số giờ nghe kể khổ",
    value: "9999+ giờ",
    icon: "🎧",
    note: "Chuyên gia tư vấn tâm lý không bằng cấp cho nhau."
  }
];

function populateStats() {
  statsContainer.innerHTML = "";
  
  friendshipStats.forEach((stat, index) => {
    const card = document.createElement("div");
    card.classList.add("stat-card");
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <div class="stat-info">
      <span class="stat-label">${stat.label}</span>
        <div class="stat-header-row">
        <span class="stat-icon-mini">${stat.icon}</span>
          <span class="stat-value">${stat.value}</span>
        </div>
        <span class="stat-note">${stat.note}</span>
      </div>
    `;
    
    statsContainer.appendChild(card);
  });
}

// Lightbox functions removed as they are no longer needed for stats
// but keeping empty handlers if any other part of code depends on them
function openLightbox(src) {}



btnImage.addEventListener("click", () => {
  populateStats();
  imageOverlay.classList.add("active");
});

const btnGift = document.getElementById("btn-gift");
const giftOverlay = document.getElementById("gift-overlay");
const closeGift = document.getElementById("close-gift");
const fullscreenGiftBtn = document.getElementById("fullscreen-gift");
const giftModalElement = document.getElementById("gift-modal-element");

const giftIframe = document.querySelector(".gift-iframe");

btnGift.addEventListener("click", () => {
  if (giftIframe) {
    giftIframe.src = giftIframe.src;
  }
  giftOverlay.classList.add("active");
});

closeGift.addEventListener("click", () => {
  giftOverlay.classList.remove("active");
});

fullscreenGiftBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    if (giftModalElement.requestFullscreen) {
      giftModalElement.requestFullscreen();
    } else if (giftModalElement.webkitRequestFullscreen) {
      giftModalElement.webkitRequestFullscreen();
    } else if (giftModalElement.msRequestFullscreen) {
      giftModalElement.msRequestFullscreen();
    }
    fullscreenGiftBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    fullscreenGiftBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
  }
});

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    fullscreenGiftBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
  }
});

closeImage.addEventListener("click", () => {
  imageOverlay.classList.remove("active");
});

btnMusic.addEventListener("click", () => musicOverlay.classList.add("active"));
closeMusic.addEventListener("click", () => {
  musicOverlay.classList.remove("active");
});

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audioPlayer.addEventListener("timeupdate", updateProgress);
audioPlayer.addEventListener("ended", nextSong);
progressBar.addEventListener("click", setProgress);

// Global Click Pop Sound
const popSound = document.getElementById("pop-sound");
window.addEventListener("click", () => {
  if (popSound) {
    const sound = popSound.cloneNode();
    sound.play();
  }
}, true);


loadSong(songs[songIndex]);

const lockScreen = document.getElementById("lock-screen");
const mainContent = document.getElementById("main-content");
const passDots = document.querySelectorAll(".dot");
const numBtns = document.querySelectorAll(".num-btn[data-value]");
const deleteBtn = document.querySelector(".num-btn.delete-btn");

let enteredPin = "";
const correctPin = "2302";

function updateDots() {
  passDots.forEach((dot, index) => {
    if (index < enteredPin.length) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function handleInput(num) {
  if (!lockScreen || lockScreen.classList.contains("unlocked")) return;

  if (enteredPin.length < 4) {
    enteredPin += num;
    updateDots();

    if (enteredPin.length === 4) {
      setTimeout(checkPin, 300);
    }
  }
}

function checkPin() {
  if (enteredPin === correctPin) {
    unlock();
  } else {
    fail();
  }
}

function unlock() {
  lockScreen.classList.add("unlocked");
  mainContent.classList.remove("main-content-hidden");
  mainContent.classList.add("main-content-visible");
  enteredPin = "";
  updateDots();
}

function fail() {
  const dotsContainer = document.getElementById("pass-dots");
  dotsContainer.classList.add("shake");

  if (navigator.vibrate) {
    navigator.vibrate(200);
  }

  setTimeout(() => {
    dotsContainer.classList.remove("shake");
    enteredPin = "";
    updateDots();
  }, 500);
}

function deleteLastDigit() {
  if (enteredPin.length > 0) {
    enteredPin = enteredPin.slice(0, -1);
    updateDots();
  }
}

if (numBtns) {
  numBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); 
      handleInput(btn.getAttribute("data-value"));
    });
  });
}

if (deleteBtn) {
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteLastDigit();
  });
}

document.addEventListener("keydown", (e) => {
  if (!lockScreen || lockScreen.classList.contains("unlocked")) return;

  if (e.key >= "0" && e.key <= "9") {
    handleInput(e.key);
  } else if (e.key === "Backspace") {
    deleteLastDigit();
  }
});

const resetLockBtn = document.getElementById("btn-reset-lock");
if (resetLockBtn) {
  resetLockBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

// ============================================================
// BIRTHDAY CAKE MODULE
// ============================================================
const cakeBtn = document.getElementById('btn-cake');
const cakeOverlay = document.getElementById('cake-overlay');
const closeCakeBtn = document.getElementById('close-cake');
const flameEl = document.getElementById('flame');
const blowBtn = document.getElementById('blow-btn');
const blowInstruction = document.getElementById('blow-instruction');
const wishContainer = document.getElementById('wish-container');
const wishText = document.getElementById('wish-text');
const relightBtn = document.getElementById('relight-btn');
const confettiCanvas = document.getElementById('confetti-canvas');

let cakeCandleLit = true;
let cakeMicStream = null;
let cakeMicInterval = null;
let cakeConfettiId = null;

const birthdayWishes = [
  "🎉 Chúc mày năm mới bớt báo, nhiều tiền hơn, và đừng nói 'mai học' nữa nghen!",
  "🤫 Happy Birthday! Chúc mày giữ bí mật được thêm 7/10 nhé — thay vì 6/10 như hiện tại!",
  "💍 Năm mới chúc mày mau có bồ để tao còn được đi ăn cưới ké (và quẹt thẻ miễn phí)!",
  "⚡ Chúc mày năm nay rep tin nhắn nhanh hơn — kể cả lúc KHÔNG có drama!",
  "📚 Sinh nhật vui! Năm nay 'mai học' ít hơn, học thật nhiều hơn nha mày ơi... just kidding 😂",
  "🎂 Chúc mày sinh nhật vui! Tụi mình 'lùi cùng nhau' thêm một năm nữa nha 🫂",
  "😂 Năm mới chúc mày vẫn là chính mày — vô tri, lầy lội, và là đứa bạn best của tao!",
  "🧠 Chúc mày IQ tăng thêm 1/10 mỗi năm, đến già mới đạt 10/10. Tính ra còn... lâu lắm 😜",
  "💾 Happy Birthday! Kho 128GB ảnh dìm của mày xin được giữ nguyên trạng thái 'sẵn sàng tống tiền'!",
];

function openCakeModal() {
  cakeCandleLit = true;
  if (flameEl) {
    flameEl.style.opacity = '1';
    flameEl.style.display = 'block';
    flameEl.classList.remove('flame-out');
    flameEl.style.animation = 'flicker 0.9s ease-in-out alternate infinite';
  }
  if (blowInstruction) blowInstruction.style.display = 'flex';
  if (wishContainer) wishContainer.style.display = 'none';
  cakeOverlay.classList.add('active');
  startCakeMicDetection();
}

function closeCakeModal() {
  cakeOverlay.classList.remove('active');
  stopCakeMicDetection();
  if (cakeConfettiId) { cancelAnimationFrame(cakeConfettiId); cakeConfettiId = null; }
  if (confettiCanvas) {
    const ctx = confettiCanvas.getContext('2d');
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiCanvas._particles = [];
  }
  const modal = document.querySelector('.cake-modal');
  if (modal) modal.classList.remove('celebrating');
}

function relightCandle() {
  cakeCandleLit = true;
  if (flameEl) {
    flameEl.style.display = 'block';
    flameEl.classList.remove('flame-out');
    flameEl.style.animation = 'flicker 0.9s ease-in-out alternate infinite';
  }
  if (blowInstruction) blowInstruction.style.display = 'flex';
  if (wishContainer) wishContainer.style.display = 'none';
  if (confettiCanvas) {
    const ctx = confettiCanvas.getContext('2d');
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiCanvas._particles = [];
    confettiCanvas.width = 0; // reset so next burst re-sizes
  }
  if (cakeConfettiId) { cancelAnimationFrame(cakeConfettiId); cakeConfettiId = null; }
  const modal = document.querySelector('.cake-modal');
  if (modal) modal.classList.remove('celebrating');
  // Remove leftover smoke/emoji
  document.querySelectorAll('.smoke-particle, .emoji-drop').forEach(el => el.remove());
  startCakeMicDetection();
}

function blowCandle() {
  if (!cakeCandleLit) return;
  cakeCandleLit = false;
  stopCakeMicDetection();

  // 1. Flash overlay
  triggerBlowFlash();

  // 2. Extinguish flame
  if (flameEl) {
    flameEl.classList.add('flame-out');
    setTimeout(() => {
      flameEl.style.display = 'none';
      triggerSmoke();
    }, 300);
  }

  // 3. Modal shake + rainbow glow
  const modal = document.querySelector('.cake-modal');
  if (modal) modal.classList.add('celebrating');

  // 4. Hide blow instruction
  setTimeout(() => { if (blowInstruction) blowInstruction.style.display = 'none'; }, 250);

  // 5. Multi-burst fireworks (3 waves)
  setTimeout(() => launchConfettiBurst(0.5, 0.38), 400);
  setTimeout(() => launchConfettiBurst(0.2, 0.55), 800);
  setTimeout(() => launchConfettiBurst(0.8, 0.45), 1200);

  // 6. Emoji rain
  setTimeout(() => launchEmojiRain(), 650);

  // 7. Show wish with typewriter effect
  setTimeout(() => {
    if (wishContainer) {
      wishContainer.style.display = 'flex';
      const wish = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)];
      typewriterEffect(wishText, wish, 35);
    }
  }, 950);
}

async function startCakeMicDetection() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    cakeMicStream = stream;
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 2048;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    cakeMicInterval = setInterval(() => {
      if (!cakeCandleLit) { clearInterval(cakeMicInterval); return; }
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a, v) => a + v, 0) / dataArray.length;
      if (avg > 43) blowCandle();
    }, 100);
  } catch (e) {
    console.log('Mic unavailable, use button to blow.');
  }
}

function stopCakeMicDetection() {
  if (cakeMicInterval) { clearInterval(cakeMicInterval); cakeMicInterval = null; }
  if (cakeMicStream) { cakeMicStream.getTracks().forEach(t => t.stop()); cakeMicStream = null; }
}

// Cinematic helpers
function triggerBlowFlash() {
  const flash = document.createElement('div');
  flash.className = 'blow-flash';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 500);
}

function triggerSmoke() {
  const candle = document.querySelector('.candle-wrap');
  if (!candle) return;
  const scene = document.getElementById('cake-scene');
  if (!scene) return;
  const candleRect = candle.getBoundingClientRect();
  const sceneRect = scene.getBoundingClientRect();
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const smoke = document.createElement('div');
      smoke.className = 'smoke-particle';
      smoke.style.left = (candleRect.left - sceneRect.left + candleRect.width / 2 + (Math.random() - 0.5) * 10) + 'px';
      smoke.style.top = (candleRect.top - sceneRect.top) + 'px';
      scene.style.position = 'relative';
      scene.appendChild(smoke);
      setTimeout(() => smoke.remove(), 1600);
    }, i * 120);
  }
}

function launchConfettiBurst(cxRatio, cyRatio) {
  if (!confettiCanvas) return;
  const canvas = confettiCanvas;
  const scene = canvas.parentElement;
  if (canvas.width === 0) {
    canvas.width = scene.offsetWidth;
    canvas.height = scene.offsetHeight;
  }
  const ctx = canvas.getContext('2d');
  const cx = canvas.width * cxRatio;
  const cy = canvas.height * cyRatio;
  const colors = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff6bff','#ff9f43','#a29bfe','#fd79a8','#00cec9','#ffffff'];

  const burst = Array.from({ length: 80 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 10 + 2;
    return {
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      w: Math.random() * 9 + 4, h: Math.random() * 5 + 2,
      rot: Math.random() * 360, rotV: (Math.random() - 0.5) * 15,
      gravity: 0.3, alpha: 1, circle: Math.random() > 0.55,
    };
  });

  // Merge with existing particles if any
  if (!canvas._particles) canvas._particles = [];
  canvas._particles.push(...burst);

  if (cakeConfettiId) return; // already drawing
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    if (!canvas._particles) return;
    for (const p of canvas._particles) {
      if (p.alpha <= 0) continue;
      alive = true;
      p.vy += p.gravity; p.x += p.vx; p.y += p.vy; p.rot += p.rotV;
      if (p.y > canvas.height * 0.85) p.alpha -= 0.022;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      if (p.circle) { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill(); }
      else { ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); }
      ctx.restore();
    }
    canvas._particles = canvas._particles.filter(p => p.alpha > 0);
    if (alive) cakeConfettiId = requestAnimationFrame(draw);
    else { cakeConfettiId = null; }
  }
  draw();
}

function launchEmojiRain() {
  const scene = document.getElementById('cake-scene');
  if (!scene) return;
  const emojis = ['🎉','🥳','🎊','🎈','🎁','✨','⭐','🌟','💫','🎀'];
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'emoji-drop';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = (Math.random() * 90) + '%';
      el.style.fontSize = (Math.random() * 0.8 + 1.0) + 'rem';
      const dur = (Math.random() * 1.2 + 1.4).toFixed(2);
      el.style.animation = `emojifall ${dur}s ease-in forwards`;
      scene.appendChild(el);
      setTimeout(() => el.remove(), parseFloat(dur) * 1000 + 100);
    }, i * 100);
  }
}

function typewriterEffect(el, text, speed = 40) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

if (cakeBtn) cakeBtn.addEventListener('click', openCakeModal);
if (closeCakeBtn) closeCakeBtn.addEventListener('click', closeCakeModal);
if (cakeOverlay) cakeOverlay.addEventListener('click', (e) => { if (e.target === cakeOverlay) closeCakeModal(); });
if (blowBtn) blowBtn.addEventListener('click', blowCandle);
if (relightBtn) relightBtn.addEventListener('click', relightCandle);




