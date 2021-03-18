import React, {useState, useEffect} from "react";
import axios from "axios";
import Layout from "../components/Layout";
import {Container, Row, Col, Form} from "react-bootstrap";
import Input from "../components/Input";
import Formtitle from "../components/Formtitle";
import FormButton from "../components/FormButton";

function Booked(props) {
    const [totalTickets, setTotalTickets] = useState([]);
    const [bookedTickets, setBookedTickets] = useState([]);
    const [cancelTickets, setCancelTickets] = useState({
        cancelTicket: ""
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get("http://localhost:4000/api/", {
            cancelToken: source.token,
        }).then(response => {
            setTotalTickets(response.data[0].totalTickets);
        }).catch(error => {
            if (axios.isCancel(error)) {
            } else {
                throw error;
            }
        });

        return () => {
            source.cancel();
        }
    });

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get("http://localhost:4000/api/booked", {
            cancelToken: source.token,
        }).then(response => {
            setBookedTickets(response.data[0].bookedTicket);
        }).catch(error => {
            if (axios.isCancel(error)) {
            } else {
                throw error;
            }
        });

        return () => {
            source.cancel();
        }
    });

    const handleChange = (event) => {
        const Value = event.target.value;

        setCancelTickets({
            cancelTicket: Value
        });
    };

    const cancelTicket = (event) => {
        if (bookedTickets >= cancelTickets.cancelTicket) {
            axios.post('http://localhost:4000/api/cancelticket', cancelTickets)
            .then((data) => {
                console.log(data);

                props.history.push("/mybookings");
            }).catch(err => {
                console.log(err);
            });
        } else {
            setMessage("Declined")
        }

        event.preventDefault();
    }

    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={4} className="form-ticket pt-5" >
                        <Formtitle 
                            title="My Booking"
                        />
                        <Form>
                        <Input 
                            label="Booked" 
                            type="Number"
                            name="bookedTicket"
                            value={bookedTickets}
                            />

                        <Input 
                            label="Remaining Tickets"
                            value={totalTickets}
                            />

                        <Input 
                            label="Cancel Ticket" 
                            type="Number"
                            name="cancelTicket"
                            value={cancelTickets.cancelTicket}
                            onChange={handleChange}
                            message={message}
                            />

                            <FormButton 
                                name="Cancel Ticket"
                                onClick={cancelTicket}
                            />
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Booked;