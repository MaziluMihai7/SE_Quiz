let allQuestions = [];
let currentQuestionIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let timerInterval;

function loadQuestionsFromAPI() {
    fetch("/api/questions")
        .then(res => res.json())
        .then(data => {
            allQuestions = data;
            currentQuestionIndex = 0;
            correctCount = 0;
            wrongCount = 0;
            updateScore();
            loadQuestion(allQuestions[currentQuestionIndex]);
            startTimer();
        })
        .catch(error => {
            console.error("Eroare la încărcarea întrebărilor:", error);
        });
}

function loadQuestion(question) {
    clearInterval(timerInterval);
    startTimer();

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div id="timer">Timp: 30</div>
        <div id="score-box">
            <p>Corecte: <span id="correct-count">${correctCount}</span></p>
            <p>Greșite: <span id="wrong-count">${wrongCount}</span></p>
        </div>
        <h2>${question.text}</h2>
    `;

    question.answers.forEach((answer, i) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer");
        button.setAttribute("data-index", i);

        button.addEventListener("click", function () {
            const selectedIndex = parseInt(this.getAttribute("data-index"));
            const isCorrect = selectedIndex === question.correctAnswerIndex;

            this.style.backgroundColor = isCorrect ? "green" : "red";

            if (isCorrect) correctCount++;
            else wrongCount++;

            updateScore();
            submitAnswerToBackend(question.id, selectedIndex, isCorrect);

            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < allQuestions.length) {
                    loadQuestion(allQuestions[currentQuestionIndex]);
                } else {
                    alert("Quiz terminat!");
                    location.reload();
                }
            }, 500);
        });

        quizContainer.appendChild(button);
    });
}

function startTimer() {
    let timeLeft = 30;
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `Timp: ${timeLeft}`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Timp: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            wrongCount++;
            updateScore();
            currentQuestionIndex++;
            if (currentQuestionIndex < allQuestions.length) {
                loadQuestion(allQuestions[currentQuestionIndex]);
            } else {
                alert("Timpul s-a terminat! Quiz terminat.");
                location.reload();
            }
        }
    }, 1000);
}

function updateScore() {
    document.getElementById("correct-count").textContent = correctCount;
    document.getElementById("wrong-count").textContent = wrongCount;
}

function submitAnswerToBackend(questionId, selectedAnswerIndex, isCorrect) {
    fetch("/api/answers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            questionId: questionId,
            selectedAnswerIndex: selectedAnswerIndex,
            isCorrect: isCorrect
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
        });
}

// Start quiz
loadQuestionsFromAPI();
