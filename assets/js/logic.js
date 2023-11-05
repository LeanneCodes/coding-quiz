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

// creating variables from html elements
var startBtn = document.getElementById('start');
var startScreen = document.getElementById('start-screen');
var timer = document.getElementById('time');
var questionDiv = document.getElementById('questions');
var question = document.getElementById('question-title');
var choices = document.getElementById('choices');
var paraEl = document.createElement("p");
var endScreen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var submitBtn = document.getElementById("submit");
var initials = document.getElementById("initials");
var highscores = document.getElementById("highscores");

/*
    The user will have 100 seconds to complete the quiz before the timer runs out. If
    the user completes the quiz before the timer finishes, the timer will display "Quiz
    Completed!", otherwise it will say "Time's Up!". It will then display the end game
    screen, where the user can save their score.
*/
var timeLeft = 100;

function countdown() {
    var countdownTimer = setInterval(function() {
        timer.textContent = timeLeft + " seconds remaining";
        timeLeft--;

        if (timeLeft === 1) {
            timer.textContent = timeLeft + " second remaining";
        };

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            localStorage.setItem("Time's Up", timeLeft);
            timer.textContent = "Time's Up!";
            questionDiv.classList.add("hide");
            endScreen.classList.remove("hide");
            endGame(); // we call this function so we can save user's details to their local storage
        };

        if (currentQuestionIndex === multipleChoice.length) {
            clearInterval(countdownTimer);
            localStorage.setItem("Seconds Remaining", timeLeft);
            timer.textContent = "Quiz Completed!";
            questionDiv.classList.add("hide");
            endScreen.classList.remove("hide");
            endGame(); // we call this function so we can save user's details to their local storage
        };
    }, 1000);
};

/*
    Once the user clicks "Start Quiz", the start screen will be hidden and the first
    question and answer options will be displayed. The timer will also begin once the
    first question is displayed.
*/
startBtn.addEventListener('click', function() {
    startScreen.textContent = '';
    console.log("Total questions: " + multipleChoice.length);
    countdown();
    showQuestionAndOptions();
});

/*
    To keep track of the question, we're on, the current question index starts at 0. The answer variable
    is currently undefined, as it will dynamically change as we parse through each question.
*/
var currentQuestionIndex = 0;
var answer;

// each question contains buttons for each answer and when an option is clicked, the correct verdict is shown
function showQuestionAndOptions() {
    // We remove the hide class from the questions div, so that the questions can be displayed on screen.
    questionDiv.classList.remove("hide");
    
    question.textContent = multipleChoice[currentQuestionIndex].question;
    console.log("Question: " + question.textContent);

    var answerOptions = multipleChoice[currentQuestionIndex].options;
    console.log("Answer options: " + answerOptions);

    answer = multipleChoice[currentQuestionIndex].answer;
    console.log("Answer is: " + answer);

    choices.textContent = ""; // current choices div is empty and we will append the dynamic options to it

    for (var i = 0; i < answerOptions.length; i++) {
        var option = answerOptions[i];
        var optionBtn = document.createElement("button");
        optionBtn.textContent = option;
        optionBtn.setAttribute("style", "width: 100%; text-align: left;"); // styling the option buttons
        choices.append(optionBtn);
    }
};

// if the user's answer is correct, the show correct verdict function will run, if not the incorrect function will
choices.addEventListener('click', function(event) {
    if (event.target.textContent === answer) {
        console.log("Correct!");
        showCorrectVerdict();
    } else {
        console.log("Wrong!");
        showIncorrectVerdict();
    };

    // once an answer is chosen the question index increases by one
    currentQuestionIndex++;
    console.log(currentQuestionIndex);

    // if the question index is less than the total number of questions, the next question will show
    if (currentQuestionIndex < multipleChoice.length) {
        showQuestionAndOptions();
    };
});

// when an answer is clicked, text on the html page displays whether that answer was right or wrong for half a second
function showCorrectVerdict() {
    questionDiv.append(paraEl);
    paraEl.textContent = "Correct!";
    paraEl.setAttribute("style", "color: grey; font-style: italic; border-top: 1px solid grey; padding-top: 5px;");

    setTimeout(function() {
        paraEl.remove(); // the text and styling is removed from the page
    }, 500);
};

function showIncorrectVerdict() {
    questionDiv.append(paraEl);
    paraEl.textContent = "Wrong!";
    paraEl.setAttribute("style", "color: grey; font-style: italic; border-top: 1px solid grey; padding-top: 5px;");
    deductTime();
    
    setTimeout(function() {
        paraEl.remove(); // the text and styling is removed from the page
    }, 500);
};

// if the answer is wrong, 10 seconds is deducted from the timer
function deductTime() {
    timeLeft -= 10;
};

// once the game ends, the user's score is displayed and they can save their score with their initials
function endGame() {
    finalScore.textContent = timeLeft;
    console.log("Final score is: " + finalScore.textContent);

    submitBtn.addEventListener('click', function() {
        initials = initials.value.trim(); // .trim() removes whitespace the user may have typed
        // if the input field is not empty, the score and initials will be passed through to the addScoreToLocalStorage function
        if (initials !== "") {
            addScoreToLocalStorage(initials, timeLeft);
            window.location.href = "./highscores.html"; // relocates the user to the highscores html page
        } else {
            alert("Please enter your initials."); // prompts user for their intials before submitting
        };
    });
};

/*
    This function takes in the user's initials and score.
    The highscoresArray converts the current local storage item into an object if it exists or an empty array into an object.
    The newScore takes in the initials and score (remaining seconds) and it's stored as an object.
    This is then added to the highscoresArray, because both formats are now compatible.
    Then the local storage is converted back into a string using JSON.stringify, as local storage stores data as strings.
*/
function addScoreToLocalStorage(initials, remainingSeconds) {
    var highscoresArray = JSON.parse(localStorage.getItem("highscores")) || [];
    console.log(highscoresArray);
    
    var newScore = { initials: initials, remainingSeconds: remainingSeconds };
    console.log(newScore);
    
    highscoresArray.push(newScore);
    console.log(highscoresArray);

    localStorage.setItem("highscores", JSON.stringify(highscoresArray));
};