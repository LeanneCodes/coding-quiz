var highscores = document.getElementById("highscores");
var scoreLi = document.createElement("li");
var notifyUser = document.createElement("p");
var clearScores = document.getElementById("clear");



showHighscores();

clearScores.addEventListener('click', function() {
    scoreLi.remove();
    notifyUser.textContent = "No highscores displayed.";
    highscores.append(notifyUser);
})