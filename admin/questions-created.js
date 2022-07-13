const urlDomain = "https://pubby-service.herokuapp.com";
const parentQuestion = sessionStorage.getItem("parentQuestion");

let answerCount = 1;
let tagCount = 1;
let keywordCount = 1;

function createQuestions() {
  const parameterMap = getParameters();

  let question = {
    type: parameterMap.get("type"),
    description: parentQuestion.description,
    pack: parentQuestion.pack,
    answers: getAnswerArray(parameterMap),
    keywords: parentQuestion.keywords,
    tags: parentQuestion,
  };

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

createQuestions();
