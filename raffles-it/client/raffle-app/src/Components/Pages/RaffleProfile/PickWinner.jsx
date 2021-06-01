import React, { useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { useHistory } from 'react-router-dom';
import axios from "axios"
export default function PickWinner({
  id,
  setWinner,
  winner,
  secretToken,
  setSecretToken,
  reset,
  setReset,
  msg,
  setMsg
}) {

    const history = useHistory()
    console.log('secret', secretToken)
  async function ChooseAWinner(e) {
    e.preventDefault()
    // debugger
   try {
      const baseUrl = `http://localhost:4100`;
      const endpoint = `/raffles/${id}/winner`;
      const data = {
        secretToken: secretToken
      }
      const chooseWinner = await axios.put(`${baseUrl}${endpoint}`, data);
      console.log("add", chooseWinner);
      // setWinner(chooseWinner)
      console.log('msg', secretToken)
      if (secretToken){
      history.push(`/raffle/${id}/winner`)
      setMsg('User was picked')
      // console.log('msg', secretToken)
    } else {
      setMsg(`Please enter raffle's secret token`)
    }
      
    } catch (error) {
      console.log("error", error);
    }
  }

  

  return (
    <div className="pick-winner-container">
      <div className="pick-winner">
        <h2>Pick a Winner</h2>
        <form className="pick-winner-form" onSubmit={ChooseAWinner} >
          <input type="text" placeholder="secret token" onChange={(e) => setSecretToken(e.target.value)} value={secretToken} />
          <input type="submit" value="Pick a Winner" />
          <p>{msg}</p>
        </form>
      </div>
    </div>
  );
}
