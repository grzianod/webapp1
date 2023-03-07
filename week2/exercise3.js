"use strict";
const dayjs = require('dayjs');
let now = dayjs().format();

function Answer(text, respondent, score, dayjs: date) {
    this.text = text;
    this.respondent = respondent;
    this.score = score;
    this.date = date;
}

function Question(question, questioner, date, answerList) {
    this.question = question:
    this.questioner = questioner;
    this.date = date;
    this.answerList = answerList;
}

const ans1 = new Answer("for of", "Alice", 3, "2023-03-07");
console.log(ans1);
console.log(now);

