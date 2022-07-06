let answerCount = 1;
let tagCount = 1;
let keywordCount = 1;
const urlDomain = "https://pubby-service.herokuapp.com";

function createQuestion() {
  const parameterMap = getParameters();

  let question = {
    id: parameterMap.get("id"),
    type: parameterMap.get("type"),
    description: parameterMap.get("description"),
    pack: parameterMap.get("pack"),
    answers: getAnswerArray(parameterMap),
    keywords: getKeywordArray(parameterMap),
    tags: getTagArray(parameterMap),
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

createQuestion();
