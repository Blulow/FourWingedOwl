import { fetchCounterData } from "../index.js";

const counter = document.getElementById('counter');

async function displayCounterData() {
    try {
        const counterData = await fetchCounterData();
        counter.textContent = `Subjects suceeded: ${counterData.count}`;
    } catch (error) {
        console.error('Error fetching counter data: ', error);
    }
}

displayCounterData();