import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import Layout from "../components/Layout";
import Input from "../components/Input";
import FormTitle from "../components/FormTitle";
import FormButton from "../components/FormButton";

function Home(props) {
    const [totalTickets, setTotalTickets] = useState([]);
    const [bookedTicket, setBookedTicket] = useState({
        bookedTicket: ""
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get("/myticket/", {
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

    const handleChange = (event) => {
        const Value = event.target.value;

        setBookedTicket({
            bookedTicket: Value
        });
    }

    const bookTicket = (event) => {

        if (totalTickets >= bookedTicket.bookedTicket) {
            axios.post('/myticket/bookticket', bookedTicket)
                .then((data) => {
                    console.log(data);

                    props.history.push("/mybookings");
                }).catch(err => {
                    console.log(err);
                });
        } else {
            setMessage("Declined");
        }

        event.preventDefault();
    }

    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={4} className="form-ticket pt-5" >
                        <FormTitle 
                            title="Book Ticket"
                        />
                        <Form>
                            <Input
                                label="Book"
                                type="Number"
                                name="bookedTicket"
                                value={bookedTicket.bookedTicket}
                                onChange={handleChange}
                                message={message}
                            />

                            <Input
                                label="Remaining Tickets"
                                value={totalTickets}
                            />

                            <FormButton 
                                name="Book Ticket"
                                onClick={bookTicket}
                            />
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Home;