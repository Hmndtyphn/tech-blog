// inactivity timer
var inactivityTimer = function () {
    var time;
    window.onload = resetTimer

    // events 
    document.onkeypress = resetTimer;
    document.onmousemove = resetTimer;

    // logout due to inactivity
    function logoutUser() {
        logout();
    }

    // reset timer
    function resetTimer() {
        clearTimeout(time);

        // logout after 30 seconds
        time = setTimeout(logoutUser, 30000);
    }
};

// run inactivity timer on current window
window.onload = function () {
    inactivityTimer();
};
