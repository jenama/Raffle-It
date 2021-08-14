import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./CSS/navbar.css";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Navbar({ id }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div>
      <nav>
        <Link to="/">All Raffles</Link>{" "}
        <Link to={`/raffle/${id}/register`}>Register</Link>{" "}
        <Link to={`/raffle/${id}/participants`}>Participants</Link>{" "}
        <Link to={`/raffle/${id}/pick-winner`}>Pick Winner</Link>
      </nav>
    </div>
  );
}
