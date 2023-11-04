/*
    Logic for the quiz
    1. a start button that when clicked, a timer starts and the first question appears
    2. each question contains buttons for each answer
    3. when an answer is clicked, text on the html page displays whether that answer was right or wrong
    4. if the answer is wrong, 10 seconds is deducted from the timer
    5. the quiz should end either when the timer reaches 0 or all questions are answered
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
var optionBtns = document.querySelectorAll(".optBtn");
var paraEl = document.createElement("p");
var endScreen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var submitBtn = document.getElementById("submit");
var initials = document.getElementById("initials");
var highscores = document.getElementById("highscores");

// 1. a start button that when clicked, a timer starts and the first question appears
var timeLeft = 20;

function countdown() {
    var countdownTimer = setInterval(function() {
        timer.textContent = timeLeft + " seconds remaining";
        timeLeft--;

        if (timeLeft === 1) {
            timer.textContent = timeLeft + " second remaining";
        }

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            localStorage.setItem("Time's Up", timeLeft);
            timer.textContent = "Time's Up!";
            questionDiv.classList.add("hide");
            endScreen.classList.remove("hide");
            endGame();
        }

        if (currentQuestionIndex === multipleChoice.length) {
            clearInterval(countdownTimer);
            localStorage.setItem("Seconds Remaining", timeLeft);
            timer.textContent = "Quiz Completed!";
            questionDiv.classList.add("hide");
            endScreen.classList.remove("hide");
            endGame();
        }
    }, 1000);
}

startBtn.addEventListener('click', function() {
    startScreen.textContent = '';
    console.log(multipleChoice.length);
    countdown();
    showQuestionAndOptions();

});

var currentQuestionIndex = 0;
var answer;

// 2a. each question contains buttons for each answer and when an option is clicked, the correct verdict is shown
function showQuestionAndOptions() {
    questionDiv.classList.remove("hide");
    
    question.textContent = multipleChoice[currentQuestionIndex].question;
    var answerOptions = multipleChoice[currentQuestionIndex].options;
    answer = multipleChoice[currentQuestionIndex].answer;

    choices.innerHTML = "";

    for (var j = 0; j < answerOptions.length; j++) {
        var option = answerOptions[j];
        var optionBtn = document.createElement("button");
        optionBtn.textContent = option;
        optionBtn.classList.add("optBtn");
        choices.append(optionBtn);
    }
}

choices.addEventListener('click', function(event) {
    if (event.target.textContent === answer) {
        console.log("Correct!");
        showCorrectVerdict();
    } else {
        console.log("Wrong!");
        showIncorrectVerdict();
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < multipleChoice.length) {
        showQuestionAndOptions();
    }
});

// 3. when an answer is clicked, text on the html page displays whether that answer was right or wrong
function showCorrectVerdict() {
    questionDiv.append(paraEl);
    paraEl.textContent = "Correct!";
    paraEl.setAttribute("style", "color: grey; font-style: italic; border-top: 1px solid grey; padding-top: 5px;");

    setTimeout(function() {
        paraEl.textContent = "";
    }, 500);
}

function showIncorrectVerdict() {
    questionDiv.append(paraEl);
    paraEl.textContent = "Wrong!";
    paraEl.setAttribute("style", "color: grey; font-style: italic; border-top: 1px solid grey; padding-top: 5px;");
    deductTime();

    setTimeout(function() {
        paraEl.textContent = "";
    }, 500);
};

// 4. if the answer is wrong, 10 seconds is deducted from the timer
function deductTime() {
    timeLeft -= 10;
};

function endGame() {
    if (timeLeft <= 0) {
        finalScore.textContent = localStorage.getItem("Time's Up");
    } else {
        finalScore.textContent = localStorage.getItem("Seconds Remaining");
    }
    submitBtn.addEventListener('click', function() {
        initials = localStorage.setItem("Initials", initials.value);
        remainingSeconds = localStorage.setItem("Seconds Remaining", timeLeft);
        window.location.href = "./highscores.html";
        console.log(initials);
    })
}

