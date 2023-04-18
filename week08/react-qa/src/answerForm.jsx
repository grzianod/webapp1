import {Col, Container, Row, Button, Form, Table, Alert} from 'react-bootstrap';
import {useState} from 'react';
import dayjs from "dayjs";

function AnswerForm(props) {
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD")); //keep date as string and only when needed convert it to a dayjs object
    const [text, setText] = useState('');
    const [respondent, setRespondent] = useState('Graziano');
    const [score, setScore] = useState(0);
    const [alert, setAlert] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        /* Validation phase */
        if (date==='') {
            setAlert("Data not valid!");
            setTimeout(() => setAlert(''), 2000);
        }
        else if (isNaN(parseInt(score)))
        {
            setAlert("Score not valid!");
            setTimeout(() => setAlert(''), 2000);
        }
        else if (text === '')
            setAlert("Text not valid!");
        else if (respondent === '')
            setAlert("Respondent not valid!");
        /* End validation phase */
        else {
            const e = {
                text: text,
                respondent: respondent,
                score: parseInt(score),
                date: date,
                id: 0
            }
            console.log(e);
            props.addToList(e);
        }
    }

    function handleRespondent(event) {
        const v = event.target.value;
        setRespondent(v.toUpperCase());
    }

    const handleScore = (event) => {
        const v = parseInt(event.target.value);
        (!isNaN(v)) ? setScore(v) : setScore('');
    }

    return (
        <>
        { alert ? <Alert dismissible value={alert} onClose={() => setAlert('')} variant="danger">{alert}</Alert> : false }
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control onChange={(event) => setDate(event.target.value)} value={date}
                                  className="w-25" type="date" name="date"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Text</Form.Label>
                    <Form.Control onChange={(event) => setText(event.target.value)} className="w-25"
                                  type="text" name="text" value={text}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Respondent</Form.Label>
                    <Form.Control onChange={handleRespondent} className="w-25" type="text"
                                  name="respondent"
                                  value={respondent}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Score</Form.Label>
                    <Form.Control onChange={handleScore} className="w-25" type="text" name="score"
                                  value={score}/>
                </Form.Group>
                <Button type="submit" variant="primary">Add</Button>
                <Button onClick={props.closeForm} variant="warning">Cancel</Button>
            </Form>
        </>);
}

export default AnswerForm

