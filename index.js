const urlDomain = "http://localhost:8080";

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function updateAnswers(answerArray) {
  const answersElement = document.querySelector(".answers");
  removeAllChildNodes(answersElement);

  for (const answer of answerArray) {
    const answerElement = document.createElement("div");
    answerElement.classList.add("answer");
    const answerTextNode = document.createTextNode(answer);
    answerElement.appendChild(answerTextNode);
    answersElement.appendChild(answerElement);
  }
}

function updateQuestion(question) {
  const questionElement = document.querySelector("#question");
  questionElement.textContent = question;
}

function getSession(sessionId) {
  let session;
  requestData = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "X-Session": sessionId,
    },
  };

  return fetch(urlDomain + "/api/sessions/" + sessionId)
    .then((response) => response.json())
    .then((data) => (session = data))
    .then(() => console.log(session));
}
