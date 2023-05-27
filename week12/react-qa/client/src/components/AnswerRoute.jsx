import {Container, Row, Col, Spinner, Alert, Image} from 'react-bootstrap';
import { MainAnswers } from './AnswerComponents';
import NavHeader from './NavbarComponents';
import QuestionDescription from './QuestionComponents';

function Loading(props) {
  return (
    <Spinner className='m-2' animation="border" role="status" />
  )
}

function AnswerRoute(props) {
    return (
      <>
        <NavHeader />
        <Container fluid>
            {props.loading ? <Loading/> : false }
          <>
          <QuestionDescription question={props.question} />
          <MainAnswers answerList={props.answerList} increaseScore={props.increaseScore}
            deleteAnswer={props.deleteAnswer} addAnswer={props.addAnswer} editAnswer={props.editAnswer} />
          </>
        </Container>
      </>
    );
}

export default AnswerRoute;