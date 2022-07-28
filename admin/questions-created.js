const urlDomain = "https://pubby-service.herokuapp.com";
const parentQuestion = JSON.parse(sessionStorage.getItem("parentQuestion"));
const childQuestionArray = JSON.parse(
  sessionStorage.getItem("childQuestionArray")
);

function createChildQuestions() {
  requestBody = [];
  for (const childQuestion of childQuestionArray) {
    let question = {
      type: childQuestion.type,
      description: childQuestion.description,
      pack: parentQuestion.pack,
      answers: childQuestion.answers,
      keywords: parentQuestion.keywords,
      tags: parentQuestion.tags,
    };
    requestBody.push(question);
  }

  requestData = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  };

  console.log(requestData.body);

  fetch(
    urlDomain + "/api/questions/" + parentQuestion.id + "/child-questions",
    requestData
  ).then((response) => console.log(response));
}

createChildQuestions();
