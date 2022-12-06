// variables that will not be reassigned
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("countdownTimer");
const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 5;
const TIME_PENALTY = 10;


// variables 
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timer = 60;

// question bank to pull questions from
let questions = [
    {
        question: "Commonly used data types Do Not include:",
        choice1: "1. strings",
        choice2: "2. booleans",
        choice3: "3. alerts",
        choice4: "4. numbers",
        answer: 3,
    },
    {
        question: "The condition if an if / else statement is enclosed with ________.",
        choice1: "1. quotes",
        choice2: "2. curly brackets",
        choice3: "3. parenthesis",
        choice4: "4. square bracket",
        answer: 3,
    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        choice1: "1. numbers and strings",
        choice2: "2. other arrays",
        choice3: "3. booleans",
        choice4: "4. all of the above",
        answer: 4
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables",
        choice1: "1. commas",
        choice2: "2. curly brackets",
        choice3: "3. quotes",
        choice4: "4. parenthsis",
        answer: 3
    },    
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "1. javascript",
        choice2: "2. terminal/bash",
        choice3: "3. for loops",
        choice4: "4. console.log",
        answer: 4
    },
    {
        question: "Where is a stylesheet inserted in the html",
        choice1: "1. header",
        choice2: "2. body",
        choice3: "3. footer",
        choice4: "4. anywhere you want",
        answer: 1
    },
    {
        question: "How do you add rounded corners in CSS",
        choice1: "1. borderrounded:",
        choice2: "2. border-radius",
        choice3: "3. border:",
        choice4: "4. corners:",
        answer: 2
    },
];

startGame = () => {
    questionCounter = 0;
    score = 0;
    timer = 60;
    availableQuesions = [...questions];
    getNewQuestion();
    startTimer();
};
// main function to start the questions and to move to the submission page
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("HighScoreSubmit.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
// determening what is happeng with a correct or incorrect response
choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        if (classToApply === "incorrect") {
            penalizeTimer(TIME_PENALTY);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 500);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
// removes 10 seconds if incorrect answer is chosen
penalizeTimer = num => {
    timer -= num;
}
// the end is to stop the page and pull to the next page if timer runs below 0
startTimer = () => {
    setInterval(function () {
        timerText.innerHTML = timer;
        timer--;
        if (timer < 1) {
            window.location.assign("highScoreSubmit.html")
        }
    }, 1000);
}

startGame();