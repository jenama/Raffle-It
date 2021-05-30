import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Raffles({raffles, setRaffles,getAllRaffles
}) {
 
  // useEffect(() => {
  //   getAllRaffles()
  // });

  return (
    <div className="raffles-list">
      <h2>
        <em>All Raffles:</em>
      </h2>
      <div className="raffles-array">
        {raffles.map((raffle, i) => {
          return (
            <div className="raffle" key={i}>
              <h3>{raffle.name}</h3>
              <p>Created on:{raffle.created_at}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
