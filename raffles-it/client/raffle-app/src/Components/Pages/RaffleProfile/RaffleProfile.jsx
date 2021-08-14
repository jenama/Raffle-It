import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Switch, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import SignUp from "./SignUp";
import Participants from "./Participants";
import Winner from "./Winner";
import PickWinner from "./PickWinner";
import './CSS/raffleProfile.css';

export default function RaffleProfile({
  raffles,
  firstname,
  lastname,
  email,
  phone,
  setFirstname,
  setLastname,
  setEmail,
  setPhone,
  participants,
  setParticipants,
  name,
  secretToken,
  setSecretToken,
  reset,
  setReset,
  setMsg, msg
}) {
  const [raffle, setRaffle] = useState("");
  const [winner, setWinner] = useState('')

  const { id } = useParams();
  
  useEffect(() => {
    async function getRaffleInfo() {
      try {
        const url = `http://localhost:4100/raffles/${id}`;
        const { data } = await axios.get(url);
        setRaffle(data.payload);
      } catch (error) {
        console.log("error", error);
      }
    }
    getRaffleInfo();
  }, []);

  return (
    <div className="raffle-profile">
      <Navbar id={id} />
      <h1>Welcome to {raffle.name}'s Raffle</h1>
      <h3>Here are some rules:</h3>
     <p>Be respectful</p>
     <p>Winners will be chosen at random</p>
      <Switch>
        <Route path={`/raffle/:id/register`}>
          <SignUp
            firstname={firstname}
            lastname={lastname}
            email={email}
            phone={phone}
            setFirstname={setFirstname}
            setLastname={setLastname}
            setEmail={setEmail}
            setPhone={setPhone}
            raffles={raffles}
            name={name}
            id={id}
            setMsg={setMsg}
            msg={msg}
            reset={reset}
            setReset={setReset}
            setParticipants={setParticipants}
            participants={participants}
          />
        </Route>
        <Route path={`/raffle/:id/participants`}>
          <Participants
            raffles={raffles}
            id={id}
            setParticipants={setParticipants}
            participants={participants}
          />
        </Route>
        <Route path={`/raffle/:id/pick-winner`}>
          <PickWinner
            id={id}
            winner={winner}
            setWinner={setWinner}
            secretToken={secretToken}
            setSecretToken={setSecretToken}
            reset={reset}
            setReset={setReset}
            setMsg={setMsg}
            msg={msg}
          />
        </Route>
        <Route path={`/raffle/:id/winner`}>
          <Winner
             id={id}
            winner={winner}
            setWinner={setWinner}
            secretToken={secretToken}
            setSecretToken={setSecretToken}
          />
        </Route>
      </Switch>
    </div>
  );
}
