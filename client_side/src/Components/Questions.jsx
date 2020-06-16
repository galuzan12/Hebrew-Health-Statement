import React, { useState } from 'react';
import { Col } from 'react-bootstrap';

function Question(props) {

    return (
        <React.Fragment>
            <Col xs={8}>
                {props.question}
            </Col>
            <Col xs={4}>
                <select id={props.id} className="form-control">
                    <option value="בחר">בחר</option>
                    <option value="כן" >כן</option>
                    <option value="לא">לא</option>
                </select>
            </Col>
        </React.Fragment>
    );
}

export default Question;
