const urlDomain = "http://localhost:8080";
const sessionId = "62b57c8bf4cf7a52038a4c6e";
const playerId = "62b52e46158b496816c6fe2e";
let questionCounter = 0;
let session;

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

function updateQuestion(question) {
  const questionElement = document.querySelector("#question");
  questionElement.textContent = question.description;

  const answersElement = document.querySelector(".answers");
  removeAllChildNodes(answersElement);

  for (const answer of question.answers) {
    const answerElement = document.createElement("div");
    answerElement.classList.add("answer");
    const answerTextNode = document.createTextNode(answer);
    answerElement.appendChild(answerTextNode);
    answersElement.appendChild(answerElement);

    answerElement.addEventListener("click", clickAnswer, false);
    answerElement.questionId = question.id;
  }
}

async function clickAnswer(event) {
  console.log("clicked");
  let playerAnswer = event.currentTarget.textContent;
  let questionId = event.currentTarget.questionId;
  submitAnswer(playerAnswer, questionId);
  update();
}

function fetchSession() {
  requestData = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(urlDomain + "/api/sessions/" + sessionId, requestData)
    .then((response) => response.json())
    .then((data) => (session = data));
}

function submitAnswer(playerAnswer, questionId) {
  requestData = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "X-Session": sessionId,
      "X-Player": playerId,
    },
    body: JSON.stringify({ answer: playerAnswer }),
  };

  fetch(
    urlDomain + "/api/answers/" + questionId + "/responses",
    requestData
  ).then((response) => response.json());
}

async function getNextQuestion() {
  let nextAnswer;
  await fetchSession().then(
    (result) => (nextAnswer = result.questionDeck[questionCounter++])
  );
  return nextAnswer;
}

async function start() {
  session = await fetchSession();
  let nextQuestion = await getNextQuestion(session);
  updateQuestion(nextQuestion);
  console.log(nextQuestion);
}

async function update() {
  let nextQuestion = await getNextQuestion(session);
  updateQuestion(nextQuestion);
  console.log(nextQuestion);
}

start();
