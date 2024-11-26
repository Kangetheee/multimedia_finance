// script.js
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("financial-video");
    const quizPrompt = document.getElementById("quiz-prompt");
    const quizSection = document.getElementById("quiz-section");
    const quizContainer = document.getElementById("quiz-container");
    const submitButton = document.getElementById("submit-quiz");
    const quizScore = document.getElementById("quiz-score");
    const scorePercent = document.getElementById("score-percent");

    const questions = [
        { question: "What is the primary purpose of a budget?", options: ["To track income", "To set spending limits", "To calculate taxes", "To pay off debt"], answer: 1 },
        { question: "What is the main benefit of compound interest?", options: ["Interest on principal only", "Interest earned on interest", "Fixed rate on savings", "None of the above"], answer: 1 },
        { question: "What is the difference between a checking and savings account?", options: ["Savings accounts earn more interest", "Checking accounts earn more interest", "Checking accounts are only for emergencies", "No difference"], answer: 0 },
        { question: "What does a credit score indicate?", options: ["Your debt amount", "Your creditworthiness", "Your monthly income", "Your savings account balance"], answer: 1 },
        { question: "Which of the following is an example of a liquid asset?", options: ["Home", "Car", "Cash", "Retirement savings"], answer: 2 },
        { question: "What is the formula for calculating net worth?", options: ["Assets - Liabilities", "Income - Expenses", "Assets + Liabilities", "Income - Savings"], answer: 0 },
        { question: "What type of insurance covers health expenses?", options: ["Life insurance", "Health insurance", "Car insurance", "Home insurance"], answer: 1 },
        { question: "What is the main reason for diversifying investments?", options: ["To maximize short-term returns", "To reduce risk", "To increase interest rates", "To take advantage of inflation"], answer: 1 },
        { question: "Which of the following is a long-term investment strategy?", options: ["Day trading", "Buy and hold", "Peer-to-peer lending", "Cryptocurrency trading"], answer: 1 },
        { question: "What is the difference between a traditional IRA and a Roth IRA?", options: ["Taxable now vs tax-free later", "Tax-free now vs taxable later", "Both are taxed the same", "No difference"], answer: 1 }
    ];

    let quizStarted = false;

    // Show a question during the video at specific timestamps
    video.addEventListener("timeupdate", () => {
        if (!quizStarted && video.currentTime > 60) { // Pause at 1 minute mark
            video.pause();
            quizPrompt.textContent = "Time to answer a question before proceeding!";
            quizPrompt.classList.remove("hidden");
            setTimeout(() => {
                quizPrompt.classList.add("hidden");
                video.play();
                quizStarted = true;
            }, 3000); // Wait for 3 seconds
        }
    });

    // Load the quiz when the user navigates to it
    document.querySelector("nav a[href='#quiz-section']").addEventListener("click", () => {
        loadQuiz();
        quizSection.classList.remove("hidden");
    });

    function loadQuiz() {
        quizContainer.innerHTML = ""; // Clear existing content
        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${i}"> ${option}
                    </label>
                `).join("<br>")}
            `;
            quizContainer.appendChild(questionDiv);
        });
        submitButton.classList.remove("hidden");
    }

    // Handle quiz submission
    submitButton.addEventListener("click", () => {
        const userAnswers = questions.map((q, index) => {
            const selected = document.querySelector(`input[name='q${index}']:checked`);
            return selected ? parseInt(selected.value) : null;
        });

        const score = userAnswers.reduce((acc, answer, index) => {
            return acc + (answer === questions[index].answer ? 1 : 0);
        }, 0);

        const percentage = Math.round((score / questions.length) * 100); // Calculate percentage

        // Display score
        scorePercent.textContent = `${percentage}%`;
        quizScore.classList.remove("hidden");

        if (percentage < 70) { // Retake the quiz if below 70%
            alert("Your score is too low. Please retake the course.");
            video.currentTime = 0;
            video.play();
        } else {
            alert("Congratulations! You passed the quiz.");
        }
    });
});

// script.js

// Infographic Chart
const ctx = document.getElementById("infographic-chart").getContext("2d");

const infographicChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Savings', 'Investments', 'Debt', 'Emergency Fund'],
        datasets: [{
            label: 'Financial Distribution',
            data: [40, 30, 20, 10],
            backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#2196f3'],
            borderColor: ['#fff', '#fff', '#fff', '#fff'],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
});

// Loan Calculator
document.getElementById('calculate-loan').addEventListener('click', function () {
    const amount = parseFloat(document.getElementById('loan-amount').value);
    const years = parseFloat(document.getElementById('loan-term').value);
    const rate = parseFloat(document.getElementById('loan-rate').value) / 100;

    if (isNaN(amount) || isNaN(years) || isNaN(rate)) {
        document.getElementById('loan-result').textContent = "Please fill in all fields correctly.";
        return;
    }

    const monthlyRate = rate / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment = amount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - amount;

    document.getElementById('loan-result').textContent = `Monthly Payment: $${monthlyPayment.toFixed(2)}, Total Payment: $${totalPayment.toFixed(2)}, Total Interest: $${totalInterest.toFixed(2)}`;
});

// Savings Calculator
document.getElementById('calculate-savings').addEventListener('click', function () {
    const initial = parseFloat(document.getElementById('initial-savings').value);
    const monthly = parseFloat(document.getElementById('monthly-contribution').value);
    const rate = parseFloat(document.getElementById('savings-rate').value) / 100;
    const years = parseFloat(document.getElementById('savings-years').value);

    if (isNaN(initial) || isNaN(monthly) || isNaN(rate) || isNaN(years)) {
        document.getElementById('savings-result').textContent = "Please fill in all fields correctly.";
        return;
    }

    const months = years * 12;
    let futureValue = initial;

    for (let i = 0; i < months; i++) {
        futureValue = futureValue * (1 + rate / 12) + monthly;
    }

    document.getElementById('savings-result').textContent = `Future Value: $${futureValue.toFixed(2)}`;
});
