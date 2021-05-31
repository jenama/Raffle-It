import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import RaffleProfile from "./Components/Pages/RaffleProfile";
import axios from "axios";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
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
  const [participant, setParticipant] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function getAllRaffles() {
      try {
        const url = `http://localhost:4100/raffles`;
        const { data } = await axios.get(url);
        setRaffles(data.payload);
        console.log("data", data);
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
            setParticipant={setParticipant}
            participant={participant}
            id={id}
            name={name}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
