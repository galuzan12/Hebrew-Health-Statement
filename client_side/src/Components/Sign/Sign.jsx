import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import SignaturePad from 'react-signature-canvas'
import './Sign.css';
import Swal from 'sweetalert2'

function Sign({ setSign, trimmedDataURL, setTrimmedDataURL }) {

    let sigPad = useRef(null);

    const BigDivStyle = {
        position: 'fixed',
        backgroundColor: 'rgba(0,0,0,0.9)',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2
    }
    const x = {
        backgroundColor: 'rgba(255,255,0,0.9)',

    }

    const handleSubmit = () => {
        setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL('image/png'));
    }

    return (
        <Row style={BigDivStyle} className='Sign d-flex justify-content-center'>
            <Col xs={12}>
                <button className={'buttons btn btn-dark btn-info'} onClick={e => setSign(false)}>
                    X
                </button>
            </Col>
            <Col xs={12} className={'sigContainer'}>
                <SignaturePad canvasProps={{ className: 'sigPad' }}
                    ref={(ref) => { sigPad = ref }} />
            </Col>
            <Col xs={12}>
                <button className={'buttons btn btn-dark btn-info'} onClick={handleSubmit}>
                    שלח
                </button>
            </Col>
        </Row>
    );
}
export default Sign;