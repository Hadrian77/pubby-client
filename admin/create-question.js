let answerCount = 1;
let tagCount = 1;
let keywordCount = 1;

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
