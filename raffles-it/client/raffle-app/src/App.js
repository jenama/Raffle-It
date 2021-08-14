import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import RaffleProfile from "./Components/Pages/RaffleProfile/RaffleProfile";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [secretToken, setSecretToken] = useState("");
  const [raffles, setRaffles] = useState([]);
  const [reset, setReset] = useState('');
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [participants, setParticipants] = useState([]);
  const [msg, setMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)


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
            submitted={submitted}
            setSubmitted={setSubmitted}
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
            submitted={submitted}
            setSubmitted={setSubmitted}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
