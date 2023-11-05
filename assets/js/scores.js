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

    highscores.innerHTML = "";

    var displayedHighscores = highscoresArray.slice(0, 10);

    for (var i = 0; i < displayedHighscores.length; i++) {
        var score = displayedHighscores[i];
        var scoreLi = document.createElement("li");
        scoreLi.textContent = score.initials + " - " + score.remainingSeconds;
        highscores.appendChild(scoreLi);
    }

    console.log(displayedHighscores.length);

    if (highscoresArray.length === 0) {
        notifyUser.textContent = "No highscores displayed.";
        highscores.appendChild(notifyUser);
    }
}

showHighscores();

clearScores.addEventListener('click', function() {
    localStorage.clear();
    highscores.remove();
    notifyUser.textContent = "No highscores displayed.";
    highscoreWrapper.append(notifyUser);
})