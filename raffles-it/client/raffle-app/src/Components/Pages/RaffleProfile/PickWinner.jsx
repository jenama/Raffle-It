import React, { useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { useHistory } from 'react-router-dom';
import axios from "axios"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function PickWinner({
  id,
  setWinner,
  winner,
  secretToken,
  setSecretToken,
  reset,
  setReset,
  msg,
  setMsg, raffles
}) {

  const history = useHistory()
   const classes = useStyles();
  
  async function ChooseAWinner(e) {
    console.log('click')
    e.preventDefault()
   try {
      const baseUrl = `http://localhost:4100`;
      const endpoint = `/raffles/${id}/winner`;
      const data = {
        secretToken: secretToken
      }
      const chooseWinner = await axios.put(`${baseUrl}${endpoint}`, data);
      if (secretToken){
        // if(secretToken === raffles){
          history.push(`/raffle/${id}/winner`)
          setMsg('User was picked')
        // }else{
        //   setMsg('Enter correct secret token')
        // }
      } else {
      setMsg(`Please enter raffle's secret token`)
      }
   
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="pick-winner-container">
      <div className="pick-winner">
        <h2>Pick a Winner</h2>
        <form className="pick-winner-form" onSubmit={ChooseAWinner} >
          <input type="text" placeholder="secret token" onChange={(e) => setSecretToken(e.target.value)} value={secretToken} />
          <br/>
          <Button  type='submit' variant="outlined" size="large" color="primary" className={classes.margin}>
            Pick A Winner
          </Button>
          <p>{msg}</p>
        </form>
      </div>
    </div>
  );
}
