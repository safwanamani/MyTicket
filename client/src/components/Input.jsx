import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function Input(props) {
    return (
        <Form.Group controlId={props.controlId}>
            <Row>
                <Col md={6} className="col-label"><Form.Label>{props.label}</Form.Label></Col>
                <Col md={6} className="col-control"><Form.Control
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    name={props.name}
                    onChange={props.onChange}
                    />
                    <Form.Text className="text-muted">
                        {props.message}
                    </Form.Text>
                </Col>
            </Row>
        </Form.Group>
    )
}

export default Input;