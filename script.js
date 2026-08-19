const gift = document.getElementById('gift');
const audio = document.getElementById('bg-music');
const stageLocked = document.getElementById('stage-locked');
const stage1 = document.getElementById('stage-1');
const stage2 = document.getElementById('stage-2');
const stage3 = document.getElementById('stage-3');
const targetDate = new Date(2026, 7, 20, 0, 0, 0); 
function checkMidnightLock() {
    const now = new Date();
    const bypassLock = false; 
    if (now < targetDate && !bypassLock) {
        stageLocked.classList.remove('hidden');
        updateCountdownClock();
        setInterval(updateCountdownClock, 1000);
    } else {
        stage1.classList.remove('hidden');
    }
}
function updateCountdownClock() {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
        stageLocked.classList.add('hidden');
        stage1.classList.remove('hidden');
        return;
    }
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById('midnight-countdown').innerText = 
        String(hours).padStart(2, '0') + ":" + 
        String(minutes).padStart(2, '0') + ":" + 
        String(seconds).padStart(2, '0');
}
function createParticles() {
    const container = document.getElementById('particles');
    const emojis = ['✨', '💖', '🌸', '💫'];
    setInterval(() => {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 6000);
    }, 400);
}
createParticles();
checkMidnightLock();
gift.addEventListener('click', () => {
    audio.play().catch(e => console.log(e));
    stage1.classList.add('hidden');
    stage2.classList.remove('hidden');
    let count = 5;
    const countdownEl = document.getElementById('countdown');
    const interval = setInterval(() => {
        count--;
        if (count > 0) countdownEl.innerText = count;
        else { clearInterval(interval); triggerOpeningExplosion(); }
    }, 1000);
});
function triggerOpeningExplosion() {
    stage2.classList.add('hidden');
    stage1.classList.remove('hidden');
    gift.classList.add('shake-animation');
    for(let i=0; i<20; i++) {
        let burst = document.createElement('div');
        burst.innerText = '💖'; burst.style.position = 'absolute';
        burst.style.fontSize = '30px'; burst.style.left = '50%'; burst.style.top = '50%';
        document.body.appendChild(burst);
        setTimeout(() => {
            let angle = Math.random() * Math.PI * 2;
            let d = 150 + Math.random() * 100;
            burst.style.transform = `translate(calc(-50% + ${Math.cos(angle)*d}px), calc(-50% + ${Math.sin(angle)*d}px)) scale(2)`;
            burst.style.opacity = '0';
        }, 10);
        setTimeout(() => burst.remove(), 1000);
    }
    setTimeout(() => {
        stage1.classList.add('hidden');
        stage3.classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('message-container').classList.remove('hidden');
        }, 2000);
    }, 1200);
}