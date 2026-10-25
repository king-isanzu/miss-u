const surpriseBtn = document.getElementById('surpriseBtn');
const againBtn = document.getElementById('againBtn');
const lock = document.getElementById('surpriseLock');
const reveal = document.getElementById('surpriseReveal');
const countEl = document.getElementById('count');
const soundToggle = document.getElementById('soundToggle');
const soundLabel = document.getElementById('soundLabel');
const soundIcon = document.getElementById('soundIcon');
const audio = document.getElementById('loveAudio');
let timer = null;
let currentCount = 5;
let revealed = false;

function startCountdown() {
  if (revealed) {
    lock.classList.add('hidden');
    reveal.classList.remove('hidden');
    makeConfetti();
    return;
  }
  surpriseBtn.disabled = true;
  surpriseBtn.style.opacity = '.65';
  currentCount = 5;
  countEl.textContent = currentCount;
  clearInterval(timer);
  timer = setInterval(() => {
    currentCount -= 1;
    countEl.textContent = currentCount;
    if (currentCount <= 0) {
      clearInterval(timer);
      revealed = true;
      lock.classList.add('hidden');
      reveal.classList.remove('hidden');
      makeConfetti();
    }
  }, 1000);
}
function makeConfetti() {
  const box = document.getElementById('confetti');
  box.innerHTML = '';
  for (let i = 0; i < 30; i++) {
    const bit = document.createElement('i');
    bit.textContent = Math.random() > .45 ? '♥' : '✦';
    bit.style.left = Math.random() * 100 + '%';
    bit.style.animationDelay = Math.random() * 1.2 + 's';
    bit.style.fontSize = (10 + Math.random() * 17) + 'px';
    box.appendChild(bit);
  }
}
surpriseBtn.addEventListener('click', startCountdown);
againBtn.addEventListener('click', () => {
  revealed = false;
  lock.classList.remove('hidden');
  reveal.classList.add('hidden');
  surpriseBtn.disabled = false;
  surpriseBtn.style.opacity = '1';
  currentCount = 5;
  countEl.textContent = currentCount;
});
soundToggle.addEventListener('click', async () => {
  if (audio.paused) {
    try {
      await audio.play();
      soundToggle.setAttribute('aria-pressed', 'true');
      soundLabel.textContent = 'Sound on';
      soundIcon.textContent = '♫';
    } catch (e) {
      soundLabel.textContent = 'Tap again';
    }
  } else {
    audio.pause();
    soundToggle.setAttribute('aria-pressed', 'false');
    soundLabel.textContent = 'Sound off';
    soundIcon.textContent = '♫';
  }
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});