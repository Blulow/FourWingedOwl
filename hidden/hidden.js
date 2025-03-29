const progressBar = document.getElementById('progressBar');
const message = document.getElementById('message');
const ah = document.getElementById('ah');
const targetLine = document.getElementById('targetLine');

let progress = 0;
let interval = null;
let target = 90; // 90% line
let gameCompleted = false;

function reset() {
    progress = 0;
    progressBar.style.width = '0%';
    target = Math.floor(Math.random() * 101);
    targetLine.style.left = target + '%';
}

function checkWin() {
    if (progress == target) {
        ah.classList.remove('disabled');
        if (!gameCompleted) {
            gameCompleted = true;
            spawnLoop();
        }
    }
}

document.body.addEventListener('mousedown', () => {
    if (interval) return;
    message.textContent = "";
    interval = setInterval(() => {
        progress += 0.5;
        progressBar.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            interval = null;
            reset();
            message.textContent = "You went too far.";
            setTimeout(() => {
                message.textContent = "Hold to fill, stop exactly at the line.";
            }, 1500);
        }
    }, 10);
});

document.body.addEventListener('mouseup', () => {
    clearInterval(interval);
    interval = null;
    checkWin();
    message.textContent = "You failed. Try again.";
    setTimeout(() => {
        message.textContent = "Hold to fill, stop exactly at the line.";
    }, 1500);
    reset();
});

const messages = [
    "You missed it.",
    "Try again.",
    "Too soon.",
    "Too late.",
    "Almost.",
    "Never.",
    "Wrong.",
    "Oops.",
    "Close, but no.",
    "That's not it.",
    "Why bother?",
    "You're stuck.",
    "Not yet.",
    "Not enough.",
    "Too much.",
    "You broke it.",
    "It's broken.",
    "Glitch detected.",
    "Who are you?",
    "Wake up.",
    "Look behind you.",
    "They see you.",
    "This isn't real.",
    "Keep going.",
    "Stop now.",
    "You failed.",
    "You failed again.",
    "You can't win.",
    "This is endless.",
    "You’re wasting your time.",
    "It doesn’t matter.",
    "Are you even trying?",
    "Not this time.",
    "Wrong timing.",
    "Wrong place.",
    "Wrong move.",
    "You'll never get it.",
    "You're being watched.",
    "Someone's here.",
    "Don't trust this.",
    "Stop clicking.",
    "You're not supposed to be here.",
    "You shouldn’t have started.",
    "Is anyone there?",
    "You're too slow.",
    "You're too fast.",
    "This isn't a game.",
    "Why are you here?",
    "You lost.",
    "You lose.",
    "Try again.",
    "It's too late now.",
    "You won't escape.",
    "They're waiting.",
    "Nothing matters.",
    "You will fail.",
    "Keep trying. It won't help.",
    "Are you scared?",
    "Give up.",
    "Don't look.",
    "It's right behind you.",
    "Did you hear that?",
    "You can't hide.",
    "You clicked wrong.",
    "Nice try.",
    "Still here?",
    "You’re being observed.",
    "The system knows.",
    "You shouldn’t trust me.",
    "Why are you clicking?",
    "It’s already too late.",
    "One more time.",
    "One more try.",
    "No way out.",
    "Glitch in progress.",
    "System corrupted.",
    "You’re part of the glitch.",
    "Everything is fake.",
    "This is forever.",
    "You shouldn’t have.",
    "I warned you.",
    "Is this what you wanted?",
    "No reward. Just noise.",
    "Error: You",
    "Invalid input: Existence",
    "404: Sanity not found",
    "Don’t stop now... or do.",
    "System overload.",
    "Processing failure.",
    "Reality mismatch.",
    "Are you real?",
    "Check the door.",
    "Game Over. Or is it?",
    "Repeat. Repeat. Repeat.",
    "You won nothing.",
    "Achievement unlocked: Regret.",
    "You're still here?"
];

const sfxList = [
    'sfx/sfx1.mp3',
    'sfx/sfx2.mp3',
    'sfx/sfx3.mp3',
    'sfx/sfx4.mp3',
    'sfx/sfx5.mp3',
    'sfx/sfx6.mp3',
    'sfx/sfx7.mp3'
];

function playRandomSFX() {
    const randomSFX = sfxList[Math.floor(Math.random() * sfxList.length)];
    const audio = new Audio(randomSFX);
    audio.volume = 0.5; // Optional: control volume
    audio.play();
}

let spawnInterval = 3000; // Start slow: 3 seconds
let spawnRate = 0.95; // Each spawn will speed up by multiplying this
let minInterval = 200;

function createGlitchMessage() {
    const msg = document.createElement('div');
    msg.textContent = messages[Math.floor(Math.random() * messages.length)];
    msg.className = 'glitch-message';

    msg.style.top = Math.random() * 90 + '%';
    msg.style.left = Math.random() * 90 + '%';
    msg.style.fontSize = (Math.random() * 2 + 1) + 'em';
    msg.style.setProperty('--angle', `${Math.random() * 30 - 10}deg`);

    document.body.appendChild(msg);

    playRandomSFX();

    // Remove after a few seconds
    setTimeout(() => {
        msg.remove();
    }, 3000);

    if (spawnInterval === 200) {
        if (!localStorage.getItem('trial4Done')) {
            localStorage.setItem('trial4Done', 'true');
        }
    }
}

function spawnLoop() {
    if (gameCompleted) {
        createGlitchMessage();
        spawnInterval = Math.max(minInterval, spawnInterval * spawnRate);
        setTimeout(spawnLoop, spawnInterval);
    }
}