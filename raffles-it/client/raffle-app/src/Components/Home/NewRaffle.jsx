import React, { useState } from "react";


export default function NewRaffle({ name, setName, secretToken, setSecretToken }) {
  
  function handleName (e) {
    setName(e.target.value)
    console.log('name', e.target.value)
  }

  function handleToken (e) {
    setSecretToken(e.target.value)
  }
  
  function handleSubmit (e) {
    e.preventDefault()
    console.log('add')
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
