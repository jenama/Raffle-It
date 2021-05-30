import React, { useState } from "react";


export default function NewRaffle({ name, setName, secretToken, setSecretToken }) {

  function handleSubmit (e) {
    e.preventDefault()
  }
  
  return (
    <div className="new-raffle">
      <h2>New Raffle:</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <label>Raffle Name:*</label>
          <br />
          <input type="text" />
          <br />
          <label>Raffle Secret Token:*</label>
          <br />
          <input type="text" />
        </div>
        <div>You must remember the Raffle Token because it will </div>
        <div className='btn-submit'>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
