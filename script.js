const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultsElement = document.getElementById('results');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        resultsElement.classList.remove('hide');
        resultsElement.innerText = `Quiz completed! Your score: ${score}/${shuffledQuestions.length}`;
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is GitHub primarily used for?',
        answers: [
            { text: 'Version control and collaboration', correct: true },
            { text: 'Social media networking', correct: false },
            { text: 'Online gaming platform', correct: false },
            { text: 'Cloud storage for personal files', correct: false }
        ]
    },
    {
        question: 'What command is used to clone a repository?',
        answers: [
            { text: 'git pull', correct: false },
            { text: 'git clone', correct: true },
            { text: 'git copy', correct: false },
            { text: 'git download', correct: false }
        ]
    },
    {
        question: 'What is a "fork" in GitHub?',
        answers: [
            { text: 'A tool for eating', correct: false },
            { text: 'A personal copy of someone else\'s project', correct: true },
            { text: 'A type of commit message', correct: false },
            { text: 'A GitHub premium feature', correct: false }
        ]
    },
    {
        question: 'What does "git push" do?',
        answers: [
            { text: 'Downloads changes from remote repository', correct: false },
            { text: 'Uploads local commits to remote repository', correct: true },
            { text: 'Deletes the repository', correct: false },
            { text: 'Creates a new branch', correct: false }
        ]
    },
    {
        question: 'What is a "pull request"?',
        answers: [
            { text: 'A request to delete a repository', correct: false },
            { text: 'A way to propose changes and merge them', correct: true },
            { text: 'A GitHub support ticket', correct: false },
            { text: 'A method to backup your code', correct: false }
        ]
    }
];