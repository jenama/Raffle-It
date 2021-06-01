import React from "react";
import axios from "axios";
import "./CSS/Signup.css";

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
  name,
}) {
  async function handleParticipantRegisteration(e) {
    e.preventDefault();
    console.log("id", id);
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
      setParticipant(addParticipant);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="sign-up">
      <h2>{name}</h2>
      <form onSubmit={handleParticipantRegisteration}>
        <div className="names">
          <div className='firstname'>
            <label>First Name*</label>
            <input
              type="text"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
            />
          </div>
          <div className='lastname'>
            <label>Last Name*</label>
            <input
              type="text"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
            />
          </div>
        </div>
        <div className='email'>
          <label>Email*</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className='phone'>
          <label>Phone</label>
          <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div className='signup-btn'>
          <input type="submit" value="submit" />
          <input type="submit" value="reset" />
        </div>
      </form>
    </div>
  );
}
