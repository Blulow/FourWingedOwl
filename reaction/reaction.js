const startBtn = document.getElementById('start');
const reactionBtn = document.getElementById('reactionButton');
const result = document.getElementById('result');
let startTime, endTime, timer;

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    result.textContent = 'Wait for green...';
    const delay = Math.random() * 3000 + 3000; // 3-6 seconds

    timer = setTimeout(() => {
    reactionBtn.style.display = 'block';
    startTime = Date.now();
    result.textContent = '';
    }, delay);
});

reactionBtn.addEventListener('click', () => {
    endTime = Date.now();
    const reactionTime = endTime - startTime;
    reactionBtn.style.display = 'none';
    result.textContent = `Reaction time: ${reactionTime} ms`;
    localStorage.setItem('trial3Done', 'true');
    jumpscare();
});

function jumpscare() {
    const jumpscare = document.getElementById('jumpscare');
    const laughey = document.getElementById('laughey');
    const smiley = document.getElementById('smiley');
    const jumpscareaudio = document.getElementById('jumpscareaudio');
    const hidden = document.getElementById('hidden');
    
    jumpscare.style.display = 'block';
    hidden.style.display = 'block';
    jumpscareaudio.play();

    laughey.addEventListener('animationend', () => setTimeout(() => {
        laughey.style.display = 'none';
        smiley.style.display = 'block';
    }, 200));
}