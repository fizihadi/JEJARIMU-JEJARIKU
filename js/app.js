const highScoresBtn = document.getElementById("highScoresBtn");
const saveScoreBtn = document.getElementById("saveScoreBtn");

//INPUT
const usernameInput = document.getElementById("username");

//PAGE
const pages = Array.from(document.getElementsByClassName("page"));

//GAME Elements
const question = document.getElementById("question");
const gambar = document.getElementById("question-image");
const choices = Array.from(document.getElementsByClassName("choice"));
const scoreText = document.getElementById("score");
const questionCounterText = document.getElementById("questionCounter");

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
//TODO: load form json file

//newbutton
function penerangan() {
  const notaCikgu = 'nota.html';
  window.open(notaCikgu, '_blank');
}

const newButton = document.getElementById('newButton');
newButton.addEventListener('click', notaCikgu);

let ques = [
  // Multiple choices questions
  {
    type: 'multiple',
    image: '/image/soalan1.png',
    question: 'Apakah maksud bagi jari di atas',
    correctAnswer: 'PTM MPP MPP',
    incorrectAnswers: [
      'GABENOR MAJLIS EKSEKUTIF DAN MAJLIS UNDANGAN',
      '1 KERAJAAN PERSEKUTUAN',
      'SAYA PON TAK PASTI'
    ],
  },
  {
    type: 'multiple',
    image: '/image/MPP.jpg',
    question: 'Jelaskan Majlis Perundangan Persekutuan 1948',
    correctAnswer: '9 orang Residen British mewakili sebuah buah majlis negeri',
    incorrectAnswers: [
      'Membenarkan Pesuruhjaya British mengambil alih pentadbiran',
      'Membantu Pesuruhjaya Tinggi meluluskan undang-undang PTM 1948',
      '3 orang wakil negeri negeri selat'
    ],
  },
  {
    type: 'multiple',
    image: '/image/soalan2.png',
    question: 'Apakah maksud jejari ini?',
    correctAnswer: 'NNMB + NNMTB + 2NS',
    incorrectAnswers: [
      '1 Kerajaan Persekutuan',
      'Warganegara',
      'Tiada maksud'
    ],
  },
  {
    type: 'multiple',
    image: '/image/MalayanUnion2.jpg',
    question: 'Manakah yang bukan ciri-ciri Malayan Union?',
    correctAnswer: 'Raja menjadi ketua pentadbiran di setiap negeri',
    incorrectAnswers: [
      'Menggabungkan NNMTB, NNMB dan NNS',
      'Raja Melayu hanya akan membincangkan tentang adat istiadat dan agama sahaja',
      'kewarganegaraan berasaskan jus soli'
    ],
  },
  {
    type: 'multiple',
    image: '/image/MalayanUnion2.jpg',
    question: 'Kesan PTM 1948?',
    correctAnswer: 'Membuka ruang kewarganegaraan',
    incorrectAnswers: [
      'Kedudukan Raja-raja Melayu diabaikan',
      'Hak istimewa Orang Melayu dihapuskan',
      'Perpaduan kaum tidak dapat dibentuk'
    ],
  },
  // True or false questions
  // {
  //   type: 'boolean',
  //   question: 'Soalan',
  //   correctAnswer: 'True',
  //   incorrectAnswers: ['False'],
  // }
]

let questions = [
  {
    question: "soalan",
    gambar: "something.jpg",
    choice1: "Choice Choice 1",
    choice2: "Choice Choice 2",
    choice3: "Choice Choice 3",
    choice4: "Choice Choice 4",
    answer: 1
  },
  {
    question: "What is the answer to question 2?",
    choice1: "Choice Choice 1",
    choice2: "Choice Choice 2",
    choice3: "Choice Choice 3",
    choice4: "Choice Choice 4",
    answer: 2
  },
  {
    question: "What is the answer to question 3?",
    choice1: "Choice Choice 1",
    choice2: "Choice Choice 2",
    choice3: "Choice Choice 3",
    choice4: "Choice Choice 4",
    answer: 4
  }
];

//End Screen Elements
const finalScore = document.getElementById("finalScore");

//High Score Elements
const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Simulated Navigation
const navigateTo = pageName => {
  pages.forEach(page => {
    if (page.id === pageName) {
      page.classList.remove("hidden");
    } else {
      page.classList.add("hidden");
    }
  });
};

//GAME Functions

const playGame = () => {
  startGame();
  navigateTo("game");
};

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...ques];
  getNewQuestion();
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0) {
    //set final score text
    finalScore.innerHTML = score;
    //Go to the end page
    return navigateTo("end");
  }
  questionCounter++;
  questionCounterText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  console.log(availableQuestions[questionIndex])
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  //Remove question from available questions
  availableQuestions.splice(questionIndex, 1);

  //let users answer now that question is ready
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    //dont let the user attempt to answer until the new question is ready
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    //Add the correct/incorrect animation

    selectedChoice.parentElement.classList.add(classToApply);

    //Increase the score
    incrementScore(classToApply === "correct" ? CORRECT_BONUS : 0);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      //Load New Question
      getNewQuestion();
    }, 1000);
  });
});

const incrementScore = num => {
  score += num;
  scoreText.innerHTML = "Score: " + score;
};

//HIGH SCORES

const showHighScores = () => {
  highScoresList.innerHTML = highScores
    .map(
      highScore =>
        `<li class="high-score">${highScore.username} - ${highScore.score}</li>`
    )
    .join("");
  navigateTo("highScores");
};

const saveHighScore = () => {
  //add the score, sort the array, and splice off starting at position 5
  highScores.push({ score, username: usernameInput.value });
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  //Save to local storage for next time
  localStorage.setItem("highScores", JSON.stringify(highScores));
};

usernameInput.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !usernameInput.value;
});