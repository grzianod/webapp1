import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Col, Container, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
import './App.css'

function Answer(text, respondent, score, date) {
    this.text = text;
    this.respondent = respondent;
    this.score = score;
    this.date = date;
    this.str = function () { return `${this.text} (by ${this.respondent}) on ${this.date.format('YYYY-MM-DD')}, score: ${this.score}` }
}


const answerList = [
    new Answer('for of', 'Alice', 3, dayjs('2023-03-07')),
    new Answer('for i=0,i<N,i++', 'Harry', 1, dayjs('2023-03-04')),
    new Answer('for in', 'Harry', -2, dayjs('2023-03-02')),
    new Answer('i=0 while(i<N)', 'Carol', -1, dayjs('2023-03-01')),
];

function MyHeader(props) {
    return (
        <header>
            <h1>{props.appName || "HeapOverrun"}</h1>
        </header>
    );
}

function MyTable(props) {
    return (
        <table className="table">
            <thead>
            <Row>
                <Col>Date</Col>
                <Col>Text</Col>
                <Col>Author</Col>
                <Col>Score</Col>
                <Col>Action</Col>
            </Row>
            </thead>
            <tbody>
            {props.listOfAnswer.map( (item, index) =>
                <Row key={index}>
                    <Col>{item.date.format("YYYY-MM-DD")}</Col>
                    <Col>{item.text}</Col>
                    <Col>{item.respondent}</Col>
                    <Col>{item.score}</Col>
                    <Col>
                        <button type="button" className="btn btn-primary">Vote</button>
                    </Col>
                </Row>
            )}
            </tbody>
        </table>
    );
}

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="container-fluid">
          <div className="row">
              <MyHeader appName={"HEAPOVERRUN"}></MyHeader>
          </div>
          <main>
              <div className="row">
                  <div className="col-9">
                      <p>Question: Best way of enumerating an array in JS</p>
                  </div>
                  <div className="col-3">
                      <p>Author: Enrico</p>
                  </div>
              </div>
              <div className="row">
                  <h2>Current Answers</h2>
                  <div id="comments"></div>
              </div>
              <div className="row">
                  <div id="scoretable">
                      <MyTable listOfAnswer={answerList}></MyTable>
                  </div>
              </div>
          </main>
          <div className="row">
              <footer>
                  <p>&copy; 2023, Applicazioni Web I</p>
                  <div id="time"></div>
              </footer>
          </div>
      </div>
  )
}

export default App
