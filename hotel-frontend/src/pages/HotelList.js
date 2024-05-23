import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Navbar, Nav, Modal } from 'react-bootstrap';
import { TextField } from '@mui/material';
import BookingForm from './BookingForm';

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedHotelId, setSelectedHotelId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = (location = '') => {
        const url = location ? `http://localhost:5248/api/hotels/search/${location}` : 'http://localhost:5248/api/hotels';
        axios.get(url)
            .then(response => setHotels(response.data))
            .catch(error => console.error("Error fetching hotels:", error));
    };

    const handleSearch = () => {
        fetchHotels(search);
    };

    const handleHotelClick = (hotelId) => {
        setSelectedHotelId(hotelId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedHotelId(null);
    };

    return (
        <div>
            <Navbar className="custom-navbar" expand="lg">
                <Navbar.Brand href="#">Hotel Booking</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link onClick={() => navigate('/my-bookings')}>My Bookings</Nav.Link>
                </Nav>
            </Navbar>
            <Container>
                <Row className="my-4 sticky-search-bar justify-content-end">
                    <Col xs="auto">
                        <TextField
                            label="Search by location"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            variant="outlined"
                            size="small"
                        />
                        <Button onClick={handleSearch} className="ml-2">Search</Button>
                    </Col>
                </Row>
                <Row>
                    {hotels.map(hotel => (
                        <Col md={4} key={hotel.id} className="d-flex align-items-stretch mb-4">
                            <Card onClick={() => handleHotelClick(hotel.id)} className="w-100">
                                <Card.Img variant="top" src={hotel.pictureUrl} alt={hotel.name} className="custom-card-img" />
                                <Card.Body>
                                    <Card.Title>{hotel.name}</Card.Title>
                                    <Card.Text>{hotel.location}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Book a Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedHotelId && <BookingForm hotelId={selectedHotelId} onClose={handleCloseModal} />}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default HotelList;

