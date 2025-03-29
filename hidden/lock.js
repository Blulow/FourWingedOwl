const submitBtn = document.getElementById('submitBtn');
const codeInput = document.getElementById('codeInput');
const message = document.getElementById('message');

const correctCode = 'Obsession'; // You can change this code

submitBtn.addEventListener('click', () => {
    if (codeInput.value.trim() === correctCode) {
        window.location.href = 'hidden.html'; // Replace with your trial 4 page
    } else {
        message.textContent = 'Incorrect code.';
    }
});