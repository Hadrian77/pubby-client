let answerCount = 1;
let tagCount = 1;
let keywordCount = 1;
const urlDomain = "http://192.168.1.182:8080";

function addAnswer() {
  answerCount++;
  const answersElement = document.querySelector(".answers");
  const answerName = "answer" + answerCount;
  const answerElement = document.createElement("input");
  answerElement.type = "text";
  answerElement.classList.add("answer");
  answerElement.name = answerName;
  answerElement.id = answerName;
  answersElement.appendChild(answerElement);
}

function addTag() {
  tagCount++;
  const tagsElement = document.querySelector(".tags");
  const tagName = "tag" + tagCount;
  const tagElement = document.createElement("input");
  tagElement.type = "text";
  tagElement.classList.add("tag");
  tagElement.name = tagName;
  tagElement.id = tagName;
  tagsElement.appendChild(tagElement);
}

function addKeyword() {
  keywordCount++;
  const keywordsElement = document.querySelector(".keywords");
  const keywordName = "keyword" + keywordCount;
  const keywordElement = document.createElement("input");
  keywordElement.type = "text";
  keywordElement.classList.add("keyword");
  keywordElement.name = keywordName;
  keywordElement.id = keywordName;
  keywordsElement.appendChild(keywordElement);
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

function createQuestion() {
  const parameterMap = getParameters();

  requestData = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        id: parameterMap.get("id"),
        type: parameterMap.get("type"),
        description: parameterMap.get("description"),
        pack: parameterMap.get("pack"),
        answers: getAnswerArray(parameterMap),
        keywords: getKeywordArray(parameterMap),
        tags: getTagArray(parameterMap),
      },
    ]),
  };

  fetch(urlDomain + "/api/questions", requestData).then((response) =>
    console.log(response)
  );
}
