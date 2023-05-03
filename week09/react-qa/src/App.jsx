import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Button, Form, Table } from 'react-bootstrap';
import {BrowserRouter} from "react-router-dom";
import { useState } from 'react';
import dayjs from 'dayjs';
import { MainAnswers } from './components/AnswerComponents';
import NavHeader from './components/NavbarComponents';
import QuestionDescription from './components/QuestionComponents';
//import './App.css';

function Question(id, text, author, date) {
  this.id = id;
  this.text = text;
  this.author = author;
  this.date = date;
  this.str = function () { return `Question ID ${id}: ${this.text} (by ${this.author}) on ${this.date.format('YYYY-MM-DD')}` }
}

function Answer(id, text, respondent, score, date, questionID) {
  this.id = id;
  this.text = text;
  this.respondent = respondent;
  this.score = score;
  this.date = date;
  this.questionID = questionID;
  this.str = function () { return `Answer ID ${id}: ${this.text} (by ${this.respondent}) on ${this.date.format('YYYY-MM-DD')}, score: ${this.score} [questionID: ${this.questionID}]` }
}

const staticQuestionList = [
  new Question(1, 'Best way of enumerating an array in JS?', 'Enrico', dayjs('2023-02-28')),
];

const staticAnswerList = [
  new Answer(1, 'for of', 'Alice', 3, dayjs('2023-03-07'), 1),
  new Answer(5, 'for i=0,i<N,i++', 'Harry', 1, dayjs('2023-03-04'), 1),
  new Answer(3, 'for in', 'Harry', -2, dayjs('2023-03-02'), 1),
  new Answer(6, 'i=0 while(i<N)', 'Carol', -1, dayjs('2023-03-01'), 1),
];



function App() {
  const [question, setQuestion] = useState(staticQuestionList[0]);
  const [answerList, setAnswerList] = useState(staticAnswerList);

  function increaseScore(id) {
    //console.log('increase score id: '+id);
    setAnswerList((oldList) => oldList.map((e) => {
      if (e.id === id) {
        return Object.assign({}, e, { score: e.score + 1 });
      } else {
        return e;
      }
    })
    )
  }

  const deleteAnswer = (id) => {
    setAnswerList((oldList) => oldList.filter(
      (e) => e.id !== id
    ));
  }

  const addAnswer = (e) => {
    setAnswerList((oldList) => {
      // Create a new temporary id, waiting for a truly unique id that can only be supplied by the server
      // This temporary id will be replaced when the server will provide its id.

      // NB: Math.max: do not forget ... (spread), max does not take an array as parameter
      const newTempId = Math.max(...oldList.map((e) => e.id)) + 1;
      e.id = newTempId;
      return [...oldList, e];
    }
    );
  }

  const editAnswer = (newEl) => {
    setAnswerList((oldList) => oldList.map((e) => {
      if (e.id === newEl.id) {
        return newEl;
      } else {
        return e;
      }
    }));
  }


  return (
    <>
      <NavHeader />
      <Container fluid>
        <QuestionDescription question={question} />
        <MainAnswers answerList={answerList} increaseScore={increaseScore}
          deleteAnswer={deleteAnswer} addAnswer={addAnswer} editAnswer={editAnswer} />
      </Container>
    </>
  )
}

export default App
