import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function NewRaffle({
  name,
  setName,
  secretToken,
  setSecretToken,
  setReset,
  reset,
  msg,
  setMsg,
  submitted,
  setSubmitted,
}) {
  const classes = useStyles();

  function handleName(e) {
    setName(e.target.value);
  }

  function handleToken(e) {
    setSecretToken(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (name && secretToken) {
      try {
        const baseUrl = `http://localhost:4100`;
        const endpoint = `/raffles`;
        const data = {
          name: name,
          secret_token: secretToken,
        };
         await axios.post(`${baseUrl}${endpoint}`, data);
        setSubmitted(true);
        setMsg("Successfully entered a new raffle");
      } catch (error) {
        console.log("error", error);
      }
    } else {
      setMsg("Please enter a name and secret token!");
      setReset("");
    }
  }

  return (
    <div className="new-raffle">
      <h2>New Raffle:</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div>{msg}</div>
          <TextField
            id="filled-error-helper-text"
            label="Raffle Name*"
            defaultValue={name}
            // helperText="Incorrect entry."
            onChange={handleName} 
          />
          <br />
          <TextField
            id="filled-error-helper-text"
            label="Raffle Secret Token*"
            defaultValue={secretToken}
            // helperText="Incorrect entry."
            onChange={handleToken}
            disabled={submitted} 
          />
        </div>
        <br></br>
        <div>
          You must remember the Raffle Token because it will be asked when
          picking a winner
        </div>
        <br></br>
        <div className="btn-submit">
          <Button
            type="submit"
            variant="outlined"
            size="large"
            color="primary"
            className={classes.margin}
          >
            Create New Raffle
          </Button>
        </div>
      </form>
    </div>
  );
}
