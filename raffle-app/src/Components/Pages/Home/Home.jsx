import React from "react";
import NewRaffle from "./NewRaffle";
import Raffles from "./Raffles";
import "./CSS/Home.css";

export default function Home({
  name,
  setName,
  setSecretToken,
  secretToken,
  reset,
  setReset,
  raffles,
  setRaffles,
  raffle,
  msg,
  setMsg,
  submitted,
  setSubmitted
}) {
  return (
    <div className="home">
      <NewRaffle
        name={name}
        setName={setName}
        secretToken={secretToken}
        setSecretToken={setSecretToken}
        reset={reset}
        setReset={setReset}
        setMsg={setMsg}
        msg={msg}
        submitted={submitted}
        setSubmitted={setSubmitted}
      />
      <Raffles raffles={raffles} setRaffles={setRaffles} raffle={raffle}/>
    </div>
  );
}
