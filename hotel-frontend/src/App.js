import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HotelList from './components/HotelList';
import BookingForm from './components/BookingForm';
import BookingsList from './components/BookingList';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HotelList />} />
                <Route path="/book/:hotelId" element={<BookingForm />} />
                <Route path="/my-bookings" element={<BookingsList />} />
            </Routes>
        </Router>
    );
};

export default App;
