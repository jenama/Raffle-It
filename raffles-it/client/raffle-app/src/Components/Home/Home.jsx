import React, { useState, useEffect } from "react";
import axios from "axios";
import NewRaffle from "./NewRaffle";
import Raffles from "./Raffles";

export default function Home() {
  const [name, setName] = useState("");
  const [secretToken, setSecretToken] = useState("");
  const [raffles, setRaffles] = useState([]);
  const [reset, setReset] = useState(false)
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    async function getAllRaffles() {
      // debugger;
      try {
        const url = `http://localhost:4100/all/raffles`;
        const { data } = await axios.get(url);
        setRaffles(data.payload);
        // console.log("data", data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getAllRaffles();
  }, []);


  return (
    <div>
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
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}
