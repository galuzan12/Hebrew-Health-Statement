import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import Form from './Components/Form';
import Sign from './Components/Sign/Sign';
import LoadingSpinner from './Components/LoadingSpinner';
import Swal from 'sweetalert2'

function App() {

  const [sign, setSign] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [name, setName] = useState(localStorage.getItem("name") || '');
  const [id, setId] = useState(localStorage.getItem("id") || '');
  const [company, setCompany] = useState(localStorage.getItem("company") || '');
  const [date, setDate] = useState(new Date());
  const [degrees, setDegrees] = useState('');
  const [questions, setQuestions] = useState(['', '', '']);
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);

  const dataReset = () => {
    setSign(false);
    setName('');
    setId('');
    setDegrees('');
    window.location.reload()
  }

  useEffect(() => {
    if (!sign) return;
    setLoadingSpinner(true);
    setSign(false);
    window.scrollTo(0, 0);
    let [q1, q2, q3] = [document.getElementById('q1').value, document.getElementById('q2').value, document.getElementById('q3').value];
    localStorage.setItem("name", name);
    localStorage.setItem("id", id);
    localStorage.setItem("company", company);

    let data = {
      name,
      id,
      company,
      date,
      degrees,
      questions: {
        q1: q1,
        q2: q2,
        q3: q3,
      },
      trimmedDataURL
    }

    fetch("/api/statement", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 200) {
          setLoadingSpinner(false);
          Swal.fire({ title: 'תודה רבה', text: 'נשלח בהצלחה', })
            .then(() => {
              dataReset()
            })
        }
        else {
          setLoadingSpinner(false);
          Swal.fire({ icon: 'error', title: 'שגיאה', text: 'שליחה לא התבצעה, אנא מלא טופס באופן ידני' });

        }
      })
      .catch(function (res) { console.log(res) })
  }, [trimmedDataURL])

  const handleSubmit = (e) => {
    let [q1, q2, q3] = [document.getElementById('q1').value, document.getElementById('q2').value, document.getElementById('q3').value];

    if (q1 === 'בחר' || q1 === '' || q2 === 'בחר' || q2 === '' || q3 === 'בחר' || q3 === '' || name === '' || id === '' || degrees === '') {
      Swal.fire({ icon: 'error', title: 'שגיאה', text: 'יש למלא את כל השדות' })
    }
    else {
      setSign(true);
    }
  }

  return (
    <Container fluid>
      <div dir="rtl" className="App">
        <Form name={name} setName={setName} id={id} setId={setId} company={company} setCompany={setCompany} date={date} setDate={setDate} degrees={degrees} setDegrees={setDegrees} questions={questions} setQuestions={setQuestions} handleSubmit={handleSubmit} />
        {sign && <Sign setSign={setSign} trimmedDataURL={trimmedDataURL} setTrimmedDataURL={setTrimmedDataURL} />}
        {loadingSpinner && <LoadingSpinner style={{ zIndex: 100 }} asOverlay />}
      </div>
    </Container >
  );
}

export default App;
