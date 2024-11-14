let startTime = 0;
let updatedTime = 0;
let difference = 0;
let interval;
let isRunning = false;
let lapCounter = 1;

const display = document.getElementById('time-display');
const laps = document.getElementById('laps');

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime() - difference;
        interval = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function stopStopwatch() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    isRunning = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
    lapCounter = 1;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = 
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + ':' +
        (milliseconds < 10 ? '0' : '') + milliseconds;
}

function recordLap() {
    if (isRunning) {
        const lapItem = document.createElement('li');
        const lapTime = display.innerHTML;
        lapItem.innerHTML = `Lap ${lapCounter} <span>${lapTime}</span>`;
        laps.appendChild(lapItem);
        lapCounter++;
    }
}

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('stop').addEventListener('click', stopStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);
