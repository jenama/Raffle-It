import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import './CSS/Participants.css'

export default function Participants({ raffles, id, participants, setParticipants }) {
  useEffect(() => {
    async function getAllParticipants() {
        try {
            const url = `http://localhost:4100/raffles/${id}/participants`;
          const { data } = await axios.get(url) 
            setParticipants(data.payload)
            
      } catch (error) {
          console.log('error', error)
      }
    }
    getAllParticipants()
  }, []);
console.log('participants', participants)
  return (
      
    <div className="participants-container">
        <h2>Participants: {participants.length} total</h2>
        <div className='participants'>
            {participants.map((participant, i) => {
                return(
                    <div className='participant' key={i}>
                      <div className='left'>
                        <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'/>
                      </div>
                      <div className='right'>
                        <h3>{participant.firstname} {participant.lastname}</h3>
                        <p>{participant.email}</p>
                        <p>{participant.phone}</p>
                      </div>
                    </div>
                )
            })}
        </div>
    </div>
  );
}
