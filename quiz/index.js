(() => {
  const quizData = [
    {
      question: "의학적으로 얼굴과 머리를 구분하는 기준은?",
      answer: ["코", "눈썹", "귀", "머리카락"],
      correct: 2,
    },
    {
      question: "다음 중 바다가 아닌 곳은?",
      answer: ["카브리해", "오호츠크해", "사해", "지중해"],
      correct: 3,
    },
    {
      question: "택시 번호판의 바탕색은?",
      answer: ["녹색", "흰색", "노란색", "파란색"],
      correct: 3,
    },
    {
      question: "인구가 가장 많은 대륙은?",
      answer: ["아시아", "유럽", "아프리카", "아메리카"],
      correct: 1,
    },
  ];

  let currentQuestion = 0;
  let checkedAnswer = null;
  let correctAnswer = 0;

  const questionTitle = document.querySelector(".question-title");
  const questionSubTitle = document.querySelector(".question-sub-title");
  const button = document.querySelector(".submit-button");
  const checkButtons = document.querySelectorAll(
    ".answer input[type=checkbox]"
  );
  const labels = document.querySelectorAll(".answer-label");
  const answerContainer = document.querySelector(".answer-container");

  const handleCheckAnswer = (e) => {
    const {
      target: { value },
      target,
    } = e;
    for (let i = 0; i < checkButtons.length; i++) {
      if (checkButtons[i].checked) {
        checkButtons[i].checked = false;
      }
    }
    target.checked = true;
    checkedAnswer = parseInt(value);
  };

  const handleClick = (e) => {
    const { target } = e;
    if (checkedAnswer !== null) {
      console.log("clicked", checkedAnswer, correctAnswer);
      if (quizData[currentQuestion].correct === checkedAnswer) {
        correctAnswer += 1;
      }
      currentQuestion += 1;
      checkedAnswer = null;
      if (currentQuestion < quizData.length) {
        getQuestion(currentQuestion);
      } else {
        showResult();
        target.innerHTML = "다시 시도";
      }
    } else {
      if (currentQuestion === quizData.length) {
        currentQuestion = 0;
        initData();
      } else {
        alert("답을 선택해주세요!!!");
      }
    }
  };

  const getQuestion = (number) => {
    questionTitle.textContent = quizData[number].question;
    for (let i = 0; i < labels.length; i++) {
      labels[i].textContent = quizData[number].answer[i];
    }
    initCheckBoxs();
    if (number === 0) {
      correctAnswer = 0;
      button.textContent = "다음";
      answerContainer.classList.remove("answer-container--hide");
      questionSubTitle.classList.remove("question-sub-title--hide");
    }
  };

  const initCheckBoxs = () => {
    for (let i = 0; i < checkButtons.length; i++) {
      checkButtons[i].checked = false;
    }
    checkedAnswer = null;
  };

  const initData = () => {
    getQuestion(0);
  };

  const addEvents = () => {
    for (let i = 0; i < checkButtons.length; i++) {
      checkButtons[i].addEventListener("change", handleCheckAnswer);
    }
    button.addEventListener("click", handleClick);
  };

  const showResult = () => {
    const message = `${quizData.length}문제 중 ${correctAnswer}문제를 맞추셨습니다`;
    console.log(
      `${quizData.length}문제 중 ${correctAnswer}문제를 맞추셨습니다`
    );
    questionTitle.textContent = message;
    questionSubTitle.classList.add("question-sub-title--hide");
    answerContainer.classList.add("answer-container--hide");
  };

  const init = () => {
    initData();
    addEvents();
  };

  init();
})();
