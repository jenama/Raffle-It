import React, { useState, useEffect } from "react";
import axios from "axios";
import './CSS/Participants.css'

export default function Participants({ id, participants, setParticipants }) {

  const [participantFilter, setParticipantFilter] = useState('')
  const [participantsFilterArray,setParticipantsFilterArray] = useState([])
  
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


   const searchParticipant = (event) => {
      setParticipantFilter(event.target.value)
     
      let filteredArray = participants.filter(participant => {
          if(participant.firstname === participantFilter || participant.lastname === participantFilter){
            return true
          } else {
            return false
          }
      })
      setParticipantsFilterArray(filteredArray)
      console.log('participants filter Array', participantsFilterArray)
    }


  return (   
    <div className="participants-container">
        <input type ='text' onChange={searchParticipant} value={participantsFilterArray}/>
        <h2>Participants: {participants.length} total</h2>
        <div className='participants'>
            {participants.map((participant, i) => {
                return (
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
