import React, { useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";

export default function SignUp({
  firstname,
  lastname,
  email,
  phone,
  setFirstname,
  setLastname,
  setEmail,
  setPhone,
  participant, 
  setParticipant,
  id, 
  name
}) {


  async function handleParticipantRegisteration(e) {
    e.preventDefault();
    console.log('id', id);
    try {
      const baseUrl = `http://localhost:4100`;
      const endpoint = `/raffles/${id}/participants`;
      const data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
      };
      const addParticipant = await axios.post(`${baseUrl}${endpoint}`, data);
      console.log("add", addParticipant);
      setParticipant(addParticipant)
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="sign-up">

      <h2>{name}</h2>
      <form onSubmit={handleParticipantRegisteration}>
        <label>First Name*</label>
        <input
          type="text"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
        />
        <label>Last Name*</label>
        <input
          type="text"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
        />
        <br />
        <label>Email*</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <label>Phone</label>
        <input
          type="text"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        <input type="submit" value="submit" />
        <input type="submit" value="reset" />
      </form>
    </div>
  );
}
