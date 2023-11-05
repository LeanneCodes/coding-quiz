var highscores = document.getElementById("highscores");
var scoreLi = document.createElement("li");
var notifyUser = document.createElement("p");
var clearScores = document.getElementById("clear");
var highscoreWrapper = document.querySelector(".wrapper");

function showHighscores() {
    var highscoresArray = JSON.parse(localStorage.getItem("highscores")) || [];

    highscoresArray.sort(function(a, b) {
        return b.remainingSeconds - a.remainingSeconds;
    });
}

showHighscores();

clearScores.addEventListener('click', function() {
    highscores.remove();
    notifyUser.textContent = "No highscores displayed.";
    highscoreWrapper.append(notifyUser);
})