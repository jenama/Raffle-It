import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Raffles({
  name,
  setName,
  secretToken,
  setSecretToken,
  raffles,
  setRaffles,
}) {

    async function getAllRaffles() {
      try {
        const url = `http://localhost:4100/api/raffles`;
        const { data } = await axios.get(url);
        setRaffles(data.payload);
        //console.log("data", data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getAllRaffles()

  useEffect(() => {
    getAllRaffles()
  }, [raffles]);


  return (
    <div className="raffles-list">
      <h2><em>All Raffles:</em></h2>
      <div className='raffles-array'>
        {raffles.map((raffle) => {
            return(
                <div className='raffle'>
                    <h3>{raffle.name}</h3>
                    <p>Created on:{raffle.created_at}</p>
                </div>
            )
        })}
      </div>
    </div>
  );
}
