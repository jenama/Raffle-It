import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Switch, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import SignUp from "./SignUp";
import Participants from "./Participants";

export default function RaffleProfile({ raffles, firstname,
  lastname,
  email,
  phone,
  setFirstname,
  setLastname,
  setEmail,
  setPhone,
  participant, 
  setParticipant,
  name
 }) {
  const [raffle, setRaffle] = useState("");

  const { id } = useParams();
  useEffect(() => {
    async function getRaffleInfo() {
      try {
        const baseUrl = `http://localhost:4100`;
        const endpoint = `/raffles/${id}`;

        const { data } = await axios.get(`${baseUrl} + ${endpoint}`);
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
      <Switch>
        <Route path={`/raffle/:id/register`} >
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
            setParticipant={setParticipant}
            participant={participant}
            name={name}
            id={id}
          />
        </Route>
        <Route path={`raffle/:id/participants`}>
          <Participants/>
        </Route>
      </Switch>
    </div>
  );
}
