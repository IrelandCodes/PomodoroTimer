var time = 25 * 60;
var timerInterval;

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}
function pauseTime() {
    clearInterval(timerInterval);
}

function skipTimer() {

}

function updateTimer() {
    time -= 1;
    console.log(time);
}