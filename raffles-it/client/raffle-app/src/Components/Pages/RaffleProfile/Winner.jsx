import React, { useState, useEffect } from "react";
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import ReactDOM from "react-dom";
import axios from "axios";
import "./CSS/Winner.css";

export default function Winner({ id, winner, setWinner }) {
  useEffect(() => {
    async function getWinner() {
      try {
        const url = `http://localhost:4100/raffles/${id}/winner`;
        const { data } = await axios.get(url);
        setWinner(data.payload[0]);
      } catch (error) {
        console.log("error", error);
      }
    }
    getWinner();
  }, []);

  console.log(winner);
  return (
    <div className="winner-container">
      <h2>We Have A Winner</h2>
      <h4>{winner.firstname} {winner.lastname}</h4>
      <div>{winner.registered_at}</div>
      <div>#{winner.id}</div>
      <div><EmailIcon></EmailIcon> {winner.email}</div>
      <div><PhoneAndroidIcon></PhoneAndroidIcon> {winner.phone}</div>
    </div>
  );
}
