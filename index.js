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
