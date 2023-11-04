/*
    Logic for the quiz
    1. a start button that when clicked, a timer starts and the first question appears
    2. each question contains buttons for each answer
    3. when an answer is clicked, text on the html page displays whether that answer was right or wrong
    4. if the answer is wrong, 10 seconds is deducted from the timer
    5. the wuiz should end either when the timer reaches 0 or all questions are answered
    6. when the game ends, it should display the user's score and give the user the ability to save their initials and their score
    7. the user can leave the game and come back and view their previous highscores
*/

// declaring variables from html
var startBtn = document.getElementById('start');
var startScreen = document.getElementById('start-screen');
var timer = document.getElementById('time');
var questionDiv = document.getElementById('questions');
var question = document.getElementById('question-title');
var choices = document.getElementById('choices');

// 1. a start button that when clicked, a timer starts and the first question appears
var timeLeft = 120;

startBtn.addEventListener('click', function() {
    startScreen.textContent = '';
    console.log(multipleChoice.length);
    showQuestion();

    var countdown = setInterval(function() {
        timer.textContent = timeLeft + " seconds remaining";
        timeLeft--;

        if (timeLeft === 1) {
            timer.textContent = timeLeft + " second remaining";
        }

        if (timeLeft === 0) {
            clearInterval(countdown);
            timer.textContent = "Time's Up!";
            window.location.href = "./highscores.html";
        }
    }, 1000);

});

// 2. each question contains buttons for each answer
function showQuestion() {
    questionDiv.classList.remove("hide");
    var optionsList = document.createElement("ul");
    choices.append(optionsList);

    var answerOptionsArray = Object.values(multipleChoice[0].options);
    console.log(answerOptionsArray);
    
    for (var i = 0; i < multipleChoice.length; i++) {
        for (var j = 0; j < 4; j++) {
            console.log(answerOptionsArray[j]);
            var option = answerOptionsArray[j];
            var optionLi = document.createElement("li");
            optionLi.textContent = option;
            optionsList.append(optionLi);
        }
        question.textContent = multipleChoice[i].question;

    }
}