"use strict";
const dayjs = require('dayjs');
let now = dayjs().format();

function Answer(text, respondent, score, date) {
    this.text = text;
    this.respondent = respondent;
    this.score = score;
    this.date = date;

    this.str = function () {
        return `"${this.text}" (by ${this.respondent} on ${this.date.format('YYYY-MM-DD')}, score: ${this.score})`;
    }
}

function Question(text, questioner, date) {
    this.text = text;
    this.questioner = questioner;
    this.date = date;
    this.list = [];

    this.add = function (answer) {
        this.list.push(answer);
    }

    this.findAll = function (name) {
        return this.list.filter(answer => answer.respondent == name);
    }

    this.afterDate = function (date) {
        return this.list.filter(answer => answer.date.isAfter(date));
    }

    this.listByDate = function () {
        return [...this.list].sort((a, b) => a.date.diff(b.date));
    }

    this.listByScore = function () {
        return [...this.list].sort((a, b) => b.score - a.score);
    }

    this.avgScore = function() {
        return this.list
            .map(answer => answer.score)
            .reduce((sum,current,i,array) => sum+(current/array.length), 0);
    }

}

let quest = new Question("Best way of enumerating an array in JS?", "Bob", dayjs("2023-02-28"));
quest.add(new Answer("for of", "Alice", 3, dayjs("2023-03-07")));
quest.add(new Answer("for in", "Chuck", 5, dayjs("2023-03-01")));
quest.add(new Answer("for (i=0; i<N; i++)", "Daria", 4, dayjs("2023-03-02")));
quest.add(new Answer("while(i<N)", "Elly", 1, dayjs("2023-03-04")));

let find = quest.findAll("Alice");
let after = quest.afterDate("2023-03-02");
let sortByDate = quest.listByDate();
let sortByScore = quest.listByScore();
let avgScore = quest.avgScore();

console.log(avgScore);


