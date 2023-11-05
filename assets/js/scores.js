var highscores = document.getElementById("highscores");
var scoreLi = document.createElement("li");
var notifyUser = document.createElement("p");
var clearScores = document.getElementById("clear");
var highscoreWrapper = document.querySelector(".wrapper");


function showHighscores() {
    // for thr purpose of sorting highscores in descsending order, the array is converted back into an object.
    var highscoresArray = JSON.parse(localStorage.getItem("highscores")) || [];
    console.log(highscoresArray);

    highscoresArray.sort(function(a, b) {
        return b.remainingSeconds - a.remainingSeconds;
    });

    // if no highscores are listed, the below text will be displayed
    if (highscoresArray.length === 0) {
        highscores.textContent = "No highscores displayed.";
    };

    // we only want to show the top 10 scores, so we use the slice method
    var displayedHighscores = highscoresArray.slice(0, 10);
    console.log(displayedHighscores);

    // if the current length of highscores is less than 10, a new score will be appended to the list
    for (var i = 0; i < displayedHighscores.length; i++) {
        var score = displayedHighscores[i];
        console.log(score);

        var scoreLi = document.createElement("li");
        scoreLi.textContent = score.initials + " - " + score.remainingSeconds;
        console.log(scoreLi.textContent);

        highscores.appendChild(scoreLi);
    };

    console.log("Number of highscores displayed: " + displayedHighscores.length);
};

showHighscores();

/*
    if the user wants to remove all highscores, once they click "Clear Highscores", data will be cleared
    from local storage and the highscores element will also be removed
*/
clearScores.addEventListener('click', function() {
    localStorage.clear();
    highscores.remove();
});