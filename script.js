/**
 * Adds click event listeners to all navigation links.
 * When a link is clicked, it removes the 'active' class from all links and pages,
 * and adds the 'active' class to the clicked link and the corresponding page.
 */
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        // remove active class from all links and pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.querySelectorAll('.nav-link').forEach(nav => {
            nav.classList.remove('active');
        });

        // add active class to the clicked link and the corresponding page
        this.classList.add('active');
        const activePage = document.querySelector(this.getAttribute('href'));
        activePage.classList.add('active');
    });
});

// AJAX Example with jQuery

/**
 * Fetches data from the specified URL using AJAX and displays the fetched data on the page.
 * If an error occurs during the AJAX request, an error message is displayed.
 */
$(document).ready(function() {
    $('#fetchData').click(function() {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            type: 'GET',
            success: function(posts) {
                let output = '<ul>';
                for (let post of posts) {
                    output += `<li>${post.title}</li>`;
                }
                output += '</ul>';
                $('#posts').html(output);
            },
            error: function() {
                $('#posts').html('<p>Error loading posts.</p>');
            }
        });
    });

    /**
     * Clears the fetched data from the page.
     */
    $('#clearData').click(function() {
        $('#posts').html(''); // Clear the posts
    });
});

// Mermaid library
mermaid.initialize({ startOnLoad: true });

/* ------------------------------------------------------------- */

/**
 * Represents a quiz question.
 * @typedef {Object} QuizQuestion
 * @property {string} question - The question.
 * @property {string[]} answers - The possible answers.
 * @property {number} correct - The index of the correct answer.
 */

/**
 * Array of quiz questions.
 * @type {QuizQuestion[]}
 */
const quizQuestions = [
    {
        question: "Who is credited with inventing the World Wide Web?",
        answers: ["Tim Berners-Lee", "Bill Gates", "Steve Jobs", "Ted Nelson"],
        correct: 0
    },
    {
        question: "What year was the concept of a 'Memex' first proposed?",
        answers: ["1945", "1960", "1989", "1991"],
        correct: 0
    },
    {
        question: "Which project aimed to create a universal library with linked text?",
        answers: ["Internet Archive", "Google Books", "Project Xanadu", "Project Gutenberg"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

/**
 * Displays the current quiz question on the page.
 */
function displayQuestion() {
    const question = quizQuestions[currentQuestion];
    const questionContainer = document.getElementById('question');
    questionContainer.textContent = question.question;

    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const li = document.createElement('li');
        li.textContent = answer;
        li.onclick = () => checkAnswer(index);
        answersContainer.appendChild(li);
    });
}

/**
 * Checks the selected answer and updates the score.
 * If the answer is correct, an alert is shown.
 * If the answer is wrong, an alert is shown.
 * Further clicks are disabled after answering.
 */
function checkAnswer(index) {
    const question = quizQuestions[currentQuestion];
    const answersContainer = document.getElementById('answers');
    Array.from(answersContainer.children).forEach((li, idx) => {
        if (idx === question.correct) {
            li.classList.add('correct');
        } else {
            li.classList.add('incorrect');
        }
        li.onclick = null; // Disable further clicks after answering
    });

    if (index === question.correct) {
        score++;
        alert('Correct!');
    } else {
        alert('Wrong answer!');
    }
}

/**
 * Shows the quiz results on the page.
 * Displays the score and provides an option to restart the quiz.
 */
function showResults() {
    const resultContainer = document.getElementById('result');
    resultContainer.textContent = `Quiz completed! Your score is ${score}/${quizQuestions.length}. `;

    const lineBreak = document.createElement('br'); // Add a line break
    resultContainer.appendChild(lineBreak);

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Quiz';
    restartButton.onclick = restartQuiz;
    resultContainer.appendChild(restartButton);

    document.getElementById('answers').style.display = 'none';
    document.getElementById('question').style.display = 'none';
    document.getElementById('quiz-button').style.display = 'none';
}

/**
 * Restarts the quiz by resetting the current question and score,
 * and displays the first question.
 */
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    displayQuestion();
    document.getElementById('answers').style.display = '';
    document.getElementById('question').style.display = '';
    document.querySelector('button').style.display = '';
    document.getElementById('result').textContent = ''; // Clear the results
}

/**
 * Moves to the next question.
 * If all questions have been answered, shows the quiz results.
 */
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion === quizQuestions.length) {
        showResults();
        return;
    }
    displayQuestion();
}

window.onload = displayQuestion;

