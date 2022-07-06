const urlDomain = "https://pubby-service.herokuapp.com";
let questionCount = 0;
let answerCount = 1;
let tagCount = 1;
let keywordCount = 1;

function createQuestion() {
  const parameterMap = getParameters();

  let question = {
    type: parameterMap.get("type"),
    description: parameterMap.get("description"),
    pack: parameterMap.get("pack"),
    answers: getAnswerArray(parameterMap),
    keywords: getKeywordArray(parameterMap),
    tags: getTagArray(parameterMap),
  };

  sessionStorage.setItem("parentQuestion", question);

  requestData = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([question]),
  };

  fetch(urlDomain + "/api/questions", requestData).then((response) =>
    console.log(response)
  );
}

function getParameters() {
  // Address of the current window
  address = window.location.search;

  // Returns a URLSearchParams object instance
  parameterList = new URLSearchParams(address);

  // Created a map which holds key value pairs
  let map = new Map();

  // Storing every key value pair in the map
  parameterList.forEach((value, key) => {
    map.set(key, value);
  });

  // Returning the map of GET parameters
  return map;
}

function getAnswerArray(parameterMap) {
  let answers = new Array();
  for (let i = 0; i < answerCount; i++) {
    answers.push(parameterMap.get("answer" + answerCount));
  }
  console.log(answers);
  return answers;
}

function getTagArray(parameterMap) {
  let tags = new Array();
  for (let i = 0; i < tagCount; i++) {
    tags.push(parameterMap.get("tag" + tagCount));
  }
  console.log(tags);
  return tags;
}

function getKeywordArray(parameterMap) {
  let keywords = new Array();
  for (let i = 0; i < keywordCount; i++) {
    keywords.push(parameterMap.get("keyword" + keywordCount));
  }
  console.log(keywords);
  return keywords;
}

function addQuestion(description) {
  const questionsElement = document.querySelector(".questions");

  questionCount++;
  let questionElement = document.createElement("textarea");
  let questionName = "question" + questionCount;

  let questionLabelElement = document.createElement("label");
  questionLabelElement.for = questionName;
  questionLabelElement.textContent = "Question " + questionCount;

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

function displayQuestionTemplates(questionType) {
  const questionDescription = sessionStorage.getItem("question").description;
  switch (questionType) {
    case "left_or_right":
      const leftOrRightGuess =
        "How would Adrian respond to the following prompt:\n " +
        questionDescription;
      addQuestion(leftOrRightGuess);
      break;
    case y:
      // code block
      break;
    default:
    // code block
  }
}

createQuestion();
