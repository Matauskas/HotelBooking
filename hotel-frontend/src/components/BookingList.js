import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Typography } from '@mui/material';

const BookingsList = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5248/api/bookings')
            .then(response => setBookings(response.data))
            .catch(error => console.error("Error fetching bookings:", error));
    }, []);

    return (
        <div>
            <Navbar className="custom-navbar" expand="lg">
                <Navbar.Brand href="#">Hotel Booking</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link onClick={() => navigate('/')}>Hotels</Nav.Link>
                </Nav>
            </Navbar>
            <Container>
                <Typography variant="h4" className="my-4">My Bookings</Typography>
                <Row>
                    {bookings.map(booking => (
                        <Col md={4} key={booking.id} className="d-flex align-items-stretch mb-4">
                            <Card className="w-100">
                                <Card.Img variant="top" src={booking.hotel.pictureUrl} alt={booking.hotel.name} />
                                <Card.Body>
                                    <Card.Title>{booking.hotel.name}</Card.Title>
                                    <Card.Text>
                                        Room Type: {booking.roomType}<br />
                                        Nights: {booking.nights}<br />
                                        Breakfast Included: {booking.breakfastIncluded ? 'Yes' : 'No'}<br />
                                        Number of Persons: {booking.numberOfPersons}<br />
                                        Total Cost: €{booking.totalCost}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default BookingsList;
