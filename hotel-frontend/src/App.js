import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HotelList from './pages/HotelList';
import BookingForm from './pages/BookingForm';
import BookingsList from './pages/BookingList';
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
