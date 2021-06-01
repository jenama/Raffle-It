import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/navbar.css'

 export default function Navbar ({ id }) {
    return (
        <div>
            <nav>
                <Link to='/'>All Raffles</Link> {' '}
                <Link to={`/raffle/${id}/register`}>Register</Link> {' '}
                <Link to={`/raffle/${id}/participants`}>Participants</Link> {' '}
                <Link to={`/raffle/${id}/pick-winner`}>Pick Winner</Link>
            </nav>
        </div>
    )
}