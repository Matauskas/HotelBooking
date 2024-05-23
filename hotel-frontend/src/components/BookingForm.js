import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';

const BookingForm = ({ hotelId, onClose }) => {
    const [hotel, setHotel] = useState(null);
    const [roomType, setRoomType] = useState('Standard');
    const [nights, setNights] = useState(1);
    const [breakfastIncluded, setBreakfastIncluded] = useState(false);
    const [numberOfPersons, setNumberOfPersons] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5248/api/hotels/${hotelId}`)
            .then(response => setHotel(response.data))
            .catch(error => console.error("Error fetching hotel:", error));
    }, [hotelId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (nights <= 0 || numberOfPersons <= 0) {
            setError('Nights and Number of Persons must be greater than 0.');
            return;
        }

        const bookingRequest = {
            hotelId: parseInt(hotelId),
            roomType,
            nights: parseInt(nights),  
            breakfastIncluded,
            numberOfPersons: parseInt(numberOfPersons) 
        };

        console.log("Booking payload:", bookingRequest);

        try {
            const response = await axios.post('http://localhost:5248/api/bookings', bookingRequest);
            alert(`Booking successful! Total cost: €${response.data.totalCost}`);
            onClose();
        } catch (error) {
            console.error("Error booking hotel:", error);
            if (error.response) {
                console.error("Backend returned:", error.response.data);
            }
        }
    };

    if (!hotel) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Typography variant="h5" className="mb-3">Booking at {hotel.name}</Typography>
            <form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <FormControl fullWidth>
                            <InputLabel>Room Type</InputLabel>
                            <Select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                                <MenuItem value="Standard">Standard</MenuItem>
                                <MenuItem value="Deluxe">Deluxe</MenuItem>
                                <MenuItem value="Suite">Suite</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <TextField 
                            type="number" 
                            label="Nights" 
                            value={nights} 
                            onChange={(e) => setNights(e.target.value)} 
                            inputProps={{ min: 1 }}
                            fullWidth
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <FormControlLabel
                            control={<Checkbox checked={breakfastIncluded} onChange={(e) => setBreakfastIncluded(e.target.checked)} />}
                            label="Breakfast Included"
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <TextField 
                            type="number" 
                            label="Number of Persons" 
                            value={numberOfPersons} 
                            onChange={(e) => setNumberOfPersons(e.target.value)} 
                            inputProps={{ min: 1 }}
                            fullWidth
                        />
                    </Col>
                </Row>
                {error && (
                    <Row className="mb-3">
                        <Col>
                            <Typography color="error">{error}</Typography>
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col>
                        <Button type="submit" variant="contained" color="primary">Book</Button>
                    </Col>
                </Row>
            </form>
        </Container>
    );
};

export default BookingForm;
