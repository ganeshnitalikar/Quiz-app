const questions = [
  {
    question: "Who invented OOP?",
    answers: [
      { text: "Andrea Ferro", correct: false },
      { text: "Adele Goldberg", correct: false },
      { text: " Alan Kay", correct: true },
      { text: "Dennis Ritchie", correct: false },
    ],
  },
  {
    question: "Which among the following doesn’t come under OOP concept?",
    answers: [
      { text: "Data hiding", correct: false },
      { text: "Message passing", correct: false },
      { text: "Platform independent", correct: true },
      { text: " Data binding", correct: false },
    ],
  },
  {
    question: "Which is not a feature of OOP in general definitions?",
    answers: [
      { text: "Efficient Code", correct: false },
      { text: "Code reusability", correct: false },
      { text: "Modularity", correct: false },
      { text: "Duplicate/Redundant data", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentIndex = 0
let score = 0;

function startQuiz(){
    currentIndex = 0;
    score = 0;

    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentIndex];
    let questionNo = currentIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question ;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })
}
function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect){
        selectedButton.classList.add("correct")
    }else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
    
}

function showScore(){
    resetState()
    questionElement.innerHTML = `You Scored  ${score} out of  ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentIndex++;
    score++;
    if(currentIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', () =>
{
    if(currentIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();