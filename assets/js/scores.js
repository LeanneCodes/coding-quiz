var scoreLi = document.createElement("li");
var notifyUser = document.createElement("p");
var clearScores = document.getElementById("clear");

function showHighscores() {
    var initials = localStorage.getItem("Initials");
    console.log(initials);
    var remainingSeconds = localStorage.getItem("Seconds Remaining");
    console.log(remainingSeconds);

    if (initials !== null && remainingSeconds !== null) {
        scoreLi.textContent = initials + " - " + remainingSeconds;
        console.log(scoreLi);
        highscores.append(scoreLi);
    } else {
        console.log("Initials or remaining seconds not found in local storage.");
    }
}

showHighscores();

clearScores.addEventListener('click', function() {
    scoreLi.remove();
    notifyUser.textContent = "No highscores displayed.";
    highscores.append(notifyUser);
})