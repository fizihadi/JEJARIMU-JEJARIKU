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
const BASE_URL = window.location.origin

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
//TODO: load form json file


let questions = [
  {
    question: "apakah maksud bagi jari di atas",
    gambar: `${BASE_URL}/image/soalan1.png`,
    choice1: "PTM MPP MPP",
    choice2: "GABENOR MAJLIS EKSEKUTIF DAN MAJLIS UNDANGAN",
    choice3: "1 KERAJAAN PERSEKUTUAN",
    choice4: "SAYA PON TAK PASTI",
    answer: [1]
  },
  {
    question: "Jelaskan Majlis Perundangan Persekutuan 1948",
    gambar: `${BASE_URL}/image/MPP.jpg`,
    choice1: "membenarkan Pesuruhjaya British mengambil alih pentadbiran",
    choice2: "membantu Pesuruhjaya Tinggi meluluskan undang-undang PTM 1948",
    choice3: "9 orang residen british mewakilu sebuah buah majlis negeri",
    choice4: "3 orang wakil negeri negeri selat",
    answer: [2, 3]
  },
  {
    question: "APAKAH MAKSUD JEJARI INI?",
    gambar: `${BASE_URL}/image/soalan2.png`,
    choice1: "1 Kerajaan Persekutuan",
    choice2: "NNMB + NNMTB + 2NS",
    choice3: "WARGANEGARA",
    choice4: "TIADA MAKSUD",
    answer: [2]
  },
  {
    question: "Manakah yang bukan ciri-ciri Malayan Union?",
    gambar: `/image/malayanUnion2.jpg`,
    choice1: "menggabungkan NNMTB, NNMB dan NNS",
    choice2: "Raja Melayu hanya akan membincangkan tentang adat istiadat dan agama sahaja",
    choice3: "Raja menjadi ketua pentadbiran di setiap negeri",
    choice4: "kewarganegaraan berasaskan jus soli",
    answer: [3]
  },
  {
    question: "Kesan PTM 1948?",
    gambar: `${BASE_URL}/image/Malayan3.jpg`,
    choice1: "kedudukan Raja-raja Melayu diabaikan",
    choice2: "Hak istimewa Orang Melayu dihapuskan",
    choice3: "perpaduan kaum tidak dapat dibentuk",
    choice4: "Membuka ruang kewarganegaraan",
    answer: [4]
  }
];

//End Screen Elements
const finalScore = document.getElementById("finalScore");

//High Score Elements
const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Simulated Navigation
navigateTo = pageName => {
  pages.forEach(page => {
    if (page.id === pageName) {
      page.classList.remove("hidden");
    } else {
      page.classList.add("hidden");
    }
  });
};

//GAME Functions

playGame = () => {
  startGame();
  navigateTo("game");
};

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0) {
    //set final score text
    finalScore.innerHTML = score;
    gambar.src = ''
    //Go to the end page
    return navigateTo("end");
  }
  questionCounter++;
  questionCounterText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  // Display the image
  gambar.src = currentQuestion.gambar; // Assuming "gambar" is the ID of the image element

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
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = parseInt(selectedChoice.dataset["number"]);

    const isCorrect = currentQuestion.answer.includes(selectedAnswer);
    const classToApply = isCorrect ? "correct" : "incorrect";

    selectedChoice.parentElement.classList.add(classToApply);

    incrementScore(isCorrect ? CORRECT_BONUS : 0);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});


incrementScore = num => {
  score += num;
  scoreText.innerHTML = "Score: " + score;
};

//HIGH SCORES

showHighScores = () => {
  highScoresList.innerHTML = highScores
    .map(
      highScore =>
        `<li class="high-score">${highScore.username} - ${highScore.score}</li>`
    )
    .join("");
  navigateTo("highScores");
};
