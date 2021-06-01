import React, { useState } from "react";
import axios from "axios";


export default function NewRaffle({ name, setName, secretToken, setSecretToken, setReset, reset }) {
  
  function handleName (e) {
    setName(e.target.value)
    console.log('name', e.target.value)
  }

  function handleToken (e) {
    setSecretToken(e.target.value)
  }
  
  async function handleSubmit (e) {
    e.preventDefault()
    try {
      const baseUrl = `http://localhost:4100`
      const endpoint = `/raffles`
      const data = {
        name:name,
        secret_token: secretToken
      }
      const addRaffle= await axios.post(`${baseUrl}${endpoint}`, data)
      console.log('add', addRaffle)
    } catch (error) {
      console.log("error", error);
    }
    setReset(true)
  }
  
  return (
    <div className="new-raffle">
      <h2>New Raffle:</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <label>Raffle Name:*</label>
          <br />
          <input type="text" onChange={handleName} value={name}/>
          <br />
          <label>Raffle Secret Token:*</label>
          <br />
          <input type="text"  onChange={handleToken} value={secretToken}/>
        </div>
        <div>You must remember the Raffle Token because it will </div>
        <div className='btn-submit'>
          <input type="submit" value='Create New Raffle'/>
        </div>
      </form>
    </div>
  );
}
