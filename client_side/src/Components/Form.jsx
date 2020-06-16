import React from 'react';
import Questions from './Questions';
import { Container, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2'

function Form({ name, setName, id, setId, company, setCompany, date, setDate, degrees, setDegrees, questions, setQuestions, handleSubmit }) {

    const onChange = e => {
        console.log(/^[a-z\u0590-\u05fe]+$/i.test(e.target.value));
        // ? setName(e.target.value) : null
    }
    const focusOutId = e => {
        if (!/^\d{9}$/.test(id) && id !== '') {
            Swal.fire({ icon: 'error', title: 'שגיאה', text: 'יש להכניס תעודת זהות תקינה בעלת 9 ספרות' })
        }
    }

    return (
        <div className='Form'>
            <Row className="headers  d-flex justify-content-center">
                {/* <Col md={6} xs={12}> <img width="100%" height="100%" src={process.env.PUBLIC_URL + 'SupergasLogo.png'} alt="" /> </Col> */}
                <Col xs={12}> <h3>הצהרת בריאות</h3> </Col>
            </Row>
            <Row className="select">
                <Col xs={6}>
                    <Col xs={12}> <label htmlFor="name">שם מלא</label> </Col>
                    <Col xs={12}> <input required className="form-control" id="name" value={name} onChange={e => /^[\sa-z\u0590-\u05fe]*$/i.test(e.target.value) ? setName(e.target.value) : Swal.fire({ icon: 'error', title: 'שגיאה', text: 'ניתן להכניס בשדה זה רק אותיות' })} /> </Col>
                </Col>
                <Col xs={6}>
                    <Col xs={12}> <label htmlFor="id">ת.ז</label> </Col>
                    <Col xs={12}> <input required className="form-control" id="id" value={id} onBlur={focusOutId} onChange={e => /^[0-9]*$/.test(e.target.value) ? setId(e.target.value) : Swal.fire({ icon: 'error', title: 'שגיאה', text: 'ניתן להכניס בשדה זה רק מספרים' })} /> </Col>
                </Col>
                <Col xs={12}>
                    <Col xs={12}> <label htmlFor="company">חברה</label> </Col>
                    <Col xs={12}> <input required className="form-control" id="company" value={company} onChange={e => /^[\sa-z\u0590-\u05fe]*$/i.test(e.target.value) ? setCompany(e.target.value) : Swal.fire({ icon: 'error', title: 'שגיאה', text: 'ניתן להכניס בשדה זה רק אותיות' })} /> </Col>
                    {/* readOnly */}
                </Col>
            </Row>
            <Row className="questions">
                <Questions id="q1" question="האם אתה משתעל" />
                <Questions id="q2" question="האם חום גופך מעל 38 מעלות או האם היה לך חום כאמור בשבוע האחרון" />
                <Questions id="q3" question="האם היית במגע קרוב עם חולה קורונה בשבועיים האחרונים" />
            </Row>
            <Row className="text">
                <p><u>הוראה לאחראי על מקום העבודה:</u> יש למנוע כניסה למקום העבודה למי שלא השיב בשלילה על כל אחת מהשאלות הנ"ל למעט אדם שמשתעל בשל מצב כרוני כגון אסתמה או אלרגיה אחרת</p>
            </Row>
            <Row className="rowDeg">
                <b>תוצאת מדידת חום באמצעי לא פולשני: </ b> <input required className="form-control degrees" id="degrees" value={degrees} onChange={e => /^[0-9.]*$/.test(e.target.value) ? setDegrees(e.target.value) : Swal.fire({ icon: 'error', title: 'שגיאה', text: 'ניתן להכניס בשדה זה רק מספרים ונקודה' })} /><b> מעלות צלזיוס </b>
            </Row>
            <Row className="text">
                <p><u>הוראה לאחראי על מקום העבודה:</u>יש למנוע כניסה למקום העבודה של אדם עם חום גוף של 38 מעלות צלזיוס ומעלה</p>
            </Row>
            <Row className="date">
                <Col xs={12}>
                    <Col xs={12}> <label htmlFor="name">תאריך</label> </Col>
                    <Col xs={12}> <DatePicker className="form-control" readOnly dateFormat="dd/MM/yyyy" selected={date} onChange={date => setDate(date)} /> </Col>
                </Col>
                <Col xs={12}>
                    <Col xs={12}> <input type="button" onClick={handleSubmit} className="btn btn-dark btn-block" value="חתום ושלח" /> </Col>
                </Col>
            </Row>
        </div>
    );
}
export default Form;