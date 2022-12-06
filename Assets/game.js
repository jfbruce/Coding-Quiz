const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("countdownTimer");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timer = 60;

let questions = [
    {
        question: "what is your favorate color",
        choice1: "blue",
        choice2: "green",
        choice3: "yellow",
        choice4: "red",
        answer: 1,
    },
    {
        question: "what is your favorate food",
        choice1: "pizza",
        choice2: "pie",
        choice3: "dog",
        choice4: "cat",
        answer: 2,
    },
    {
        question: "what is your favorate car",
        choice1: "toyota",
        choice2: "honda",
        choice3: "audi",
        choice4: "ford",
        answer: 3
    },
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 3;
const TIME_PENALTY = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    timer = 9900;
    availableQuesions = [...questions];
    getNewQuestion();
    startTimer();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/HighScoreSubmit.html");
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

choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        // const classToApply = "incorrect";
        // if (selectedAnswer == currentQuestion.answer){
        //     classToApply = "correct";
        // }

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

penalizeTimer = num => {
    timer -= num;
}

startTimer = () => {
    setInterval(function () {
        timerText.innerHTML = timer;
        timer--;
        if (timer < 1) {
            window.location.assign("/highScoreSubmit.html")
        }
    }, 1000);
}

startGame();