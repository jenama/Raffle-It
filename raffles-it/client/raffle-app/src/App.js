import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import RaffleProfile from "./Components/Pages/RaffleProfile/RaffleProfile";
import axios from "axios";
import Winner from './Components/Pages/RaffleProfile/Winner'
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [secretToken, setSecretToken] = useState("");
  const [raffles, setRaffles] = useState([]);
  const [reset, setReset] = useState(false);
  const [selected, setSelected] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [participants, setParticipants] = useState([]);
  const [msg, setMsg] = useState('')


  useEffect(() => {
    async function getAllRaffles() {
      try {
        const url = `http://localhost:4100/raffles`;
        const { data } = await axios.get(url);
        setRaffles(data.payload);
      } catch (error) {
        console.log("error", error);
      }
    }
    getAllRaffles();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"}>
          <Home
            name={name}
            setName={setName}
            secretToken={secretToken}
            setSecretToken={setSecretToken}
            reset={reset}
            setReset={setReset}
            raffles={raffles}
            setRaffles={setRaffles}
            setMsg={setMsg}
            msg={msg}
          />
        </Route>
        <Route path={`/raffle/:id`}>
          <RaffleProfile
            firstname={firstname}
            lastname={lastname}
            email={email}
            phone={phone}
            setFirstname={setFirstname}
            setLastname={setLastname}
            setEmail={setEmail}
            setPhone={setPhone}
            raffles={raffles}
            setParticipants={setParticipants}
            participants={participants}
            name={name}
            secretToken={secretToken}
            setSecretToken={setSecretToken}
            reset={reset}
            setReset={setReset}
            setMsg={setMsg}
            msg={msg}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
