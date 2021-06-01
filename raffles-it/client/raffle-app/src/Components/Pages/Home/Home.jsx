import React, { useState, useEffect } from "react";
import NewRaffle from "./NewRaffle";
import Raffles from "./Raffles";
import  './CSS/Home.css'

export default function Home({ name, setName, setSecretToken, secretToken, reset, setReset, raffles, setRaffles, raffle}) {
 



  return (
    <div className='home'>
      <NewRaffle
        name={name}
        setName={setName}
        secretToken={secretToken}
        setSecretToken={setSecretToken}
        reset={reset}
        setReset={setReset} 
      />
       <Raffles
            raffles={raffles}
            setRaffles={setRaffles}
            raffle={raffle}
            // selected={selected}
            // setSelected={setSelected}
          />
    </div>
  );
}
