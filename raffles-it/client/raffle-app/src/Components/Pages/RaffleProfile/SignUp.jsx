import React from "react";
import axios from "axios";
import "./CSS/Signup.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

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

export default function SignUp({
  firstname,
  lastname,
  email,
  phone,
  setFirstname,
  setLastname,
  setEmail,
  setPhone,
  setParticipant,
  participant,
  id,
  name,
  reset,
  setReset,
  setMsg,
  msg
}) {
  const classes = useStyles();

  async function handleParticipantRegisteration(e) {
    e.preventDefault();
    // debugger
    if (firstname && lastname && email || phone) {
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
        setParticipant(addParticipant);
        setMsg('Successfully registered a participant')
      } catch (error) {
        console.log("error", error);
      }
    } else{
      setMsg('Please fill the missing inputs')
    }

  }

  function resetForm() {
    setEmail('')
    setFirstname('')
    setLastname('')
    setPhone('')
  }

  return (
    <div className="sign-up">
      <h2>{name}</h2>
      <form onSubmit={handleParticipantRegisteration}>
        <div className="names">
          <div className="firstname">
            <TextField
              // error
              id="standard-error-helper-text"
              label="Firstname*"
              defaultValue={firstname}
              helperText={msg}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="lastname">
            <TextField
              // error
              id="standard-error-helper-text"
              onChange={(e) => setLastname(e.target.value)}
              defaultValue={lastname}
              label="Lastname*"
              helperText={msg}
            />
          </div>
        </div>
        <div className="email">
          <TextField
            // error
            id="standard-error-helper-text"
            label="Email*"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
            helperText={msg}
          />
        </div>
        <div className="phone">
          <TextField
            // error
            id="standard-error-helper-text"
            label="Phone"
            onChange={(e) => setPhone(e.target.value)}
            defaultValue={phone}
            
          />
        </div>
        <div className="signup-btn">
          <Button
            type="submit"
            variant="outlined"
            size="large"
            color="primary"
            className={classes.margin}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={classes.margin}
            onClick={resetForm}
           
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
