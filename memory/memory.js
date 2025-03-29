const game = document.getElementById('game');

const cards = ['A', 'B', 'C', 'D', 'E', 'F'];
let deck = [...cards, ...cards]; // two of each
deck.sort(() => Math.random() - 0.5); // shuffle

let first = null;
let second = null;
let lock = false;
let matched = 0;

function createCard(letter, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.letter = letter;
    card.dataset.index = index;
    card.innerText = '?';
    card.addEventListener('click', () => flip(card));
    return card;
}

function flip(card) {
    if (lock || card.classList.contains('matched') || card === first) return;

    card.innerText = card.dataset.letter;

    if (!first) {
        first = card;
    } else {
        second = card;
        lock = true;
        if (first.dataset.letter === second.dataset.letter) {
            first.classList.add('matched');
            second.classList.add('matched');
            matched++;
            reset();
            if (matched === cards.length) {
                setTimeout(() => {
                    localStorage.setItem('trial2Done', 'true');
                    alert('Trial 2 complete! Next trial unlocked.');
                    window.location.href = '../index.html';
                }, 500);
            }
        } else {
            setTimeout(() => {
                first.innerText = '?';
                second.innerText = '?';
                reset();
            }, 700);
        }
    }
}

function reset() {
    first = null;
    second = null;
    lock = false;
}

deck.forEach((letter, index) => {
    game.appendChild(createCard(letter, index));
});