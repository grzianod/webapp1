"use strict";
const dayjs = require('dayjs');

function Answer(text, respondent, score, date) {
    this.text = text;
    this.respondent = respondent;
    this.score = score;
    this.date = date;
}

function Question(question, questioner, date, answerList) {


}

const ans1 = new Answer("for of", "Alice", 3, "2023-03-07");
console.log(ans1);

