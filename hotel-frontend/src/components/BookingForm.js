import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';

const BookingForm = ({ hotelId }) => {
    const [roomType, setRoomType] = useState('Standard');
    const [nights, setNights] = useState(1);
    const [breakfastIncluded, setBreakfastIncluded] = useState(false);
    const [numberOfPersons, setNumberOfPersons] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const booking = {
            hotelId,
            roomType,
            nights,
            breakfastIncluded,
            numberOfPersons
        };

        try {
            const response = await axios.post('http://localhost:5248/api/bookings', booking);
            alert(`Booking successful! Total cost: €${response.data.totalCost}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <InputLabel>Room Type</InputLabel>
                <Select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                    <MenuItem value="Standard">Standard</MenuItem>
                    <MenuItem value="Deluxe">Deluxe</MenuItem>
                    <MenuItem value="Suite">Suite</MenuItem>
                </Select>
            </FormControl>
            <TextField type="number" label="Nights" value={nights} onChange={(e) => setNights(e.target.value)} />
            <FormControlLabel
                control={<Checkbox checked={breakfastIncluded} onChange={(e) => setBreakfastIncluded(e.target.checked)} />}
                label="Breakfast Included"
            />
            <TextField type="number" label="Number of Persons" value={numberOfPersons} onChange={(e) => setNumberOfPersons(e.target.value)} />
            <Button type="submit" variant="contained" color="primary">Book</Button>
        </form>
    );
};

export default BookingForm;
