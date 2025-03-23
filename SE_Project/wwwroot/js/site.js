document.addEventListener("DOMContentLoaded", function () {
    let timeLeft = 30; // Timp inițial (secunde)
    let timerElement = document.getElementById("time");
    let correctCount = 0;
    let wrongCount = 0;
    let currentQuestionIndex = 0;

    // Lista de întrebări
    const questions = [
        {
            question: "Care este limita de viteză în localități?",
            answers: ["50 km/h", "70 km/h", "90 km/h"],
            correct: 0
        },
        {
            question: "Ce semnificație are indicatorul STOP?",
            answers: ["Oprire obligatorie", "Reducerea vitezei", "Interzis să oprești"],
            correct: 0
        }
    ];

    function startTimer() {
        let timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timerElement.textContent = timeLeft;
            } else {
                clearInterval(timerInterval);
                loadNextQuestion();
            }
        }, 1000);
    }

    function loadQuestion() {
        const questionElement = document.querySelector(".question h2");
        const answerButtons = document.querySelectorAll(".answer");

        let question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;

        answerButtons.forEach((button, index) => {
            button.textContent = question.answers[index];
            button.style.backgroundColor = "#007bff"; // Resetare culoare
            button.disabled = false; // Reactivare butoane
            button.onclick = () => checkAnswer(button, index);
        });
    }

    function checkAnswer(button, selectedIndex) {
        let correctIndex = questions[currentQuestionIndex].correct;
        const answerButtons = document.querySelectorAll(".answer");

        if (selectedIndex === correctIndex) {
            correctCount++;
            document.getElementById("correct-count").textContent = correctCount;
            button.style.backgroundColor = "green"; // Buton verde pentru răspuns corect
        } else {
            wrongCount++;
            document.getElementById("wrong-count").textContent = wrongCount;
            button.style.backgroundColor = "red"; // Buton roșu pentru răspuns greșit
            answerButtons[correctIndex].style.backgroundColor = "green"; // Arată și răspunsul corect
        }

        // Dezactivează butoanele pentru a preveni spam-ul
        answerButtons.forEach(btn => btn.disabled = true);

        // Așteaptă 1 secundă, apoi trece la următoarea întrebare
        setTimeout(loadNextQuestion, 1000);
    }

    function loadNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            timeLeft = 30; // Resetează timerul
            loadQuestion();
        } else {
            setTimeout(() => {
                alert("Quiz terminat! Scor final: " + correctCount + " corecte, " + wrongCount + " greșite.");
                location.reload(); // Reîncarcă pagina automat după terminarea quiz-ului
            }, 1000);
        }
    }

    loadQuestion();
    startTimer();
});
