import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

const HotelList = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        console.log("Fetching hotels...");
        axios.get('http://localhost:5248/api/hotels')
            .then(response => {
                console.log("Hotels fetched successfully:", response.data);
                setHotels(response.data);
            })
            .catch(error => console.error("Error fetching hotels:", error));
    }, []);

    if (hotels.length === 0) {
        return <div>Loading hotels...</div>;
    }

    return (
        <div>
            {hotels.map(hotel => (
                <Card key={hotel.id}>
                    <CardContent>
                        <img src={hotel.pictureUrl} alt={hotel.name} />
                        <Typography variant="h5">{hotel.name}</Typography>
                        <Typography variant="body2">{hotel.location}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default HotelList;
