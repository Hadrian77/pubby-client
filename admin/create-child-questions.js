const urlDomain = "https://pubby-service.herokuapp.com";
let questionCount = 0;
let answerCount = 1;
let tagCount = 1;
let keywordCount = 1;

async function createQuestion() {
  const parameterMap = getParameters();

  let question = {
    type: parameterMap.get("type"),
    description: parameterMap.get("description"),
    pack: parameterMap.get("pack"),
    answers: parameterMap.get("answers"),
    keywords: parameterMap.get("keywords"),
    tags: parameterMap.get("tags"),
  };

  requestData = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([question]),
  };

  await fetch(urlDomain + "/api/questions", requestData)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data) {
        sessionStorage.setItem("parentQuestion", JSON.stringify(data[0]));
      } else {
        alert("Something went wrong");
      }
    })
    .then(() => displayQuestionTemplates());
}

function getParameters() {
  // Address of the current window
  address = window.location.search;

  // Returns a URLSearchParams object instance
  parameterList = new URLSearchParams(address);

  // Created a map which holds key value pairs
  let map = new Map();
  let answers = [];
  let keywords = [];
  let tags = [];

  // Storing every key value pair in the map
  parameterList.forEach((value, key) => {
    if (key.includes("answer")) {
      answers.push(value);
    } else if (key.includes("keyword")) {
      keywords.push(value);
    } else if (key.includes("tag")) {
      tags.push(value);
    } else {
      map.set(key, value);
    }
  });

  map.set("answers", answers);
  map.set("keywords", keywords);
  map.set("tags", tags);
  // Returning the map of GET parameters
  console.log(map);
  return map;
}

function addQuestion(label, description) {
  const questionsElement = document.querySelector(".questions");

  questionCount++;
  let questionElement = document.createElement("textarea");
  let questionName = "question" + questionCount;

  let questionLabelElement = document.createElement("label");
  questionLabelElement.for = questionName;
  questionLabelElement.textContent = label;

  questionElement.classList.add("answer");
  questionElement.name = questionName;
  questionElement.id = questionName;
  questionElement.rows = "4";
  questionElement.cols = "40";
  questionElement.form = "questionForm";
  questionElement.textContent = description;

  questionsElement.appendChild(questionLabelElement);
  questionsElement.appendChild(document.createElement("br"));
  questionsElement.appendChild(questionElement);
  questionsElement.appendChild(document.createElement("br"));
}

function displayQuestionTemplates() {
  let parentQuestion = JSON.parse(sessionStorage.getItem("parentQuestion"));
  let childQuestionArray = [];
  console.log(parentQuestion.type);
  switch (parentQuestion.type) {
    case "left_or_right":
      const leftOrRightGuessWhat = {
        description:
          "How would {subjectPlayerName} respond to the following question:\n" +
          parentQuestion.description,
        answers: parentQuestion.answers,
        type: "left_or_right_guess_what",
      };
      childQuestionArray.push(leftOrRightGuessWhat);
      addQuestion(
        "Left or Right? Guess What",
        leftOrRightGuessWhat.description
      );

      break;
    case "y":
      // code block
      break;
    default:
    // code block
  }
  sessionStorage.setItem(
    "childQuestionArray",
    JSON.stringify(childQuestionArray)
  );
}

createQuestion();
