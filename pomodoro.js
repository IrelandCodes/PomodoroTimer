var time = 25 * 60;
var timerInterval;
var currentMode = "pomodoro";
var MODES = {
    pomodoro: 25,
    short: 5,
    long: 15
}
const DEFAULT_MODES = {
    pomodoro: 25,
    short: 5,
    long: 15
}
var totalBreaks = 0;
const alarmSound = new Audio('bell.mp3');

document.querySelectorAll("#modes button")
    .forEach(function(button) {
        button.addEventListener('click', handleModeButtons);
    });


document.querySelectorAll("#duration-control input")
    .forEach(function(input) {
        input.addEventListener('change', durationControlHandler);
        input.value = '';
    })
    
function durationControlHandler(event) {
    var value = event.target.value.trim();
    var durationId = event.target.dataset.durationId;

    if (value != '' && !isNaN(value) && Number.isInteger(parseFloat(value)) && parseInt(value) != 0) {
        MODES[durationId] = parseInt(value);
    } else {
        MODES[durationId] = DEFAULT_MODES[durationId];
    }
    resetTimer();
}

function handleModeButtons(event) {
    switchMode(event.target.dataset.modeId);
    
}

function updateControlButtons(isRunning) {
    var start_button = document.querySelector(".timer-control.start");
    var pause_button = document.querySelector(".timer-control.pause");

    if (isRunning) {
        start_button.disabled = true;
        pause_button.disabled = false;
    } else {
        start_button.disabled = false;
        pause_button.disabled = true;
    }

}

function switchMode (mode) {
    currentMode = mode;
    document.documentElement.style.backgroundColor = "var(--" + mode + ")";
    document.querySelectorAll("#modes button")
        .forEach(elem => {
            elem.classList.remove("active")
        });
    document.querySelector(`button[data-mode-id="${mode}"]`).classList.add('active');
    resetTimer();
}

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(updateTimer, 1000);
    updateControlButtons(true);
}
function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    updateControlButtons(false);
}

function skipTimer() {

}

function updateTimer() {
    var minutes = Math.floor(time/60);
    var seconds = time % 60;

    if (minutes < 10) {
        minutes = "0" + minutes;
    } 

    if (seconds < 10) {
        seconds = "0" + seconds;
    } 

    document.getElementById("timer").textContent = minutes + ":" + seconds;
    document.title = `${minutes}:${seconds} - Pomodoro`
    
    if (time <= 0) {
        pauseTimer();
        alarmSound.play();
        alert("Time's Up!");
        alarmSound.pause();
        alarmSound.currentTime = 0;
        nextMode();
    }
    time -= 1;
}

function nextMode() {
    if (currentMode == "pomodoro") {
        totalBreaks += 1;
        if (totalBreaks % 4 == 0) {
            switchMode("long");
        } else {
            switchMode("short");
        }
    } else {
        switchMode("pomodoro");
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    time = MODES[currentMode] * 60;
    updateTimer();
    updateControlButtons(false);
}