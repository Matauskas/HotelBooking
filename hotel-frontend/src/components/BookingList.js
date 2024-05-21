import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5248/api/bookings')
            .then(response => setBookings(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            {bookings.map(booking => (
                <Card key={booking.id}>
                    <CardContent>
                        <Typography variant="h5">{booking.hotel.name}</Typography>
                        <Typography variant="body2">Room Type: {booking.roomType}</Typography>
                        <Typography variant="body2">Nights: {booking.nights}</Typography>
                        <Typography variant="body2">Breakfast Included: {booking.breakfastIncluded ? 'Yes' : 'No'}</Typography>
                        <Typography variant="body2">Total Cost: €{booking.totalCost}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default BookingList;
