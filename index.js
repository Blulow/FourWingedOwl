export async function fetchCounterData() {
    const response = await fetch('https://four-winged-owl-program.glitch.me/counter', { method: 'POST' });
    if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
    const a2 = document.getElementById('a2');
    const a3 = document.getElementById('a3');
    const a4 = document.getElementById('a4');
    const a5 = document.getElementById('a5');

    try {
        if (localStorage.getItem('trial1Done')) {
            a2.classList.remove('disabled');
        } else {
            a2.style.color = '#007a02';
            a2.classList.add('disabled');
        }
        if (localStorage.getItem('trial2Done')) {
            a3.classList.remove('disabled');
        } else {
            a3.style.color = '#007a02';
            a3.classList.add('disabled');
        }
        if (localStorage.getItem('trial3Done')) {
            a4.style.display = 'block';
        } else {
            a4.style.display = 'none';
        }
        if (localStorage.getItem('trial4Done')) {
            a5.style.display = 'block';
            
            fetchCounterData().then(data => {
                console.log(data);
            }).catch(err => {
                console.log('Failed to fetch data:', err);
            });
        } else {
            a5.style.display = 'none';
        }
    } catch (error) {
        console.log('Trycatch debug lol');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'r') {
            localStorage.clear();
            location.reload();
        }
    });
});