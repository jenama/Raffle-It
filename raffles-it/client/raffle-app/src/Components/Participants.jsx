import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Participants() {
  useEffect(() => {
    async function getAllParticipants() {
      const baseUrl = `http://localhost:4100`;
    }
  }, []);

  return <div className="participants">hello</div>;
}
