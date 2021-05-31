import React, { useState, useEffect } from "react";
// import SignUp from './Components/Pages/SignUp'
import { Link } from 'react-router-dom';
// import './CSS/Raffles.css'

export default function Raffles({raffles,selected,setSelected }) {

  return (
    <div className="raffles-list">

      <h2>
        <em>All Raffles:</em>
      </h2>
      <div className="raffles-array">
        {raffles.map((raffle, i) => {
          return (
            <Link to={`/raffle/${raffle.id}`}>
              <div className="raffle" key={i}>
                <h3>{raffle.name}</h3>
                <p>Created on:{raffle.created_at}</p>
                <p>Winner id:{raffle.winner_id}</p>
                <p>Raffled on:{raffle.raffled_at}</p>
              </div>
            </Link>

          );
        })}
      </div>
    </div>
  );
}
