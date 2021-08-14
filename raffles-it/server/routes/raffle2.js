var express = require("express");
var router = express.Router();
const db = require("../db/db");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const rafflesQuery = `SELECT id, name, created_at, raffled_at, winner_id from raffles`;
    const rafflesData = await db.any(rafflesQuery);
    res.status(200);
    res.json({
      payload: rafflesData,
      msg: `The request was successful`,
    });
  } catch (error) {
    res.status(500);
    res.json({
      msg: `Failed request there was a problem with the server`,
    });
    console.log("error", error);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const singleRaffleQuery = `SELECT * FROM raffles WHERE id=$1`;
    const singleRaffleData = await db.one(singleRaffleQuery, id);

    res.status(200);
    res.json({
      payload: singleRaffleData,
      msg: `Successfully retrieved raffle with id #${id}`,
    });
  } catch (error) {
    res.status(500);
    console.log("ERROR", error);
    res.json({
      msg: `Request has failed`,
    });
  }
});

router.get("/:id/participants", async (req, res, next) => {
  const id = req.params.id;

  try {
    const participantsQuery = `SELECT users.id, raffle_id, firstname,lastname,email,phone,registered_at FROM users LEFT JOIN raffles ON users.raffle_id = raffles.id WHERE raffles.id =$1`;
    const participantsData = await db.any(participantsQuery, id);

    res.status(200);
    res.json({
      payload: participantsData,
      msg: `Successfully retrieved all participants of raffle with id #${id}`,
    });
  } catch (error) {
    res.status(500);
    console.log("ERROR", error);
    res.json({
      msg: `Request has failed`,
    });
  }
});

router.get("/:id/winner", async (req, res) => {
  const raffleId = req.params.id;
  const winnerQuery = `SELECT * FROM users WHERE raffle_id = $1
ORDER BY RANDOM()  
LIMIT 1 
`;
  const winnerData = await db.any(winnerQuery, raffleId);
  let winner = winnerData[Math.floor(Math.random() * winnerData.length)];
  if (winnerData.length > 1 && winner === null) {
    try {
      res.status(200);
      res.json({
        payload: winner,
        msg: `Successfully retrieved winner`,
      });
    } catch (error) {
      res.status(500);
      console.log("ERROR", error);
      res.json({
        msg: `The winner hasn't been picked or raffle does not exist`,
      });
    }
  } else {
    try {
      res.status(200);
      res.json({
        payload: winnerData,
        msg: `Successfully retrieved winner`,
      });
    } catch (error) {
      res.status(500);
      console.log("ERROR", error);
      res.json({
        msg: `The winner hasn't been picked or raffle does not exist`,
      });
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    const insertQuery = `INSERT INTO raffles(name, secret_token,created_at)
                          VALUES($1,$2,$3)
                          RETURNING *`;

    const data = {
      name: req.body.name,
      secretToken: req.body.secret_token,
      createdAt: new Date().toISOString(),
    };
    const insertData = await db.none(insertQuery,[data.name, data.secretToken, data.createdAt]);
    res.status(201);
    res.json({
      payload: insertData,
      msg: `A new raffle has been successfully entered`,
    });
  } catch (error) {
    res.status(500);
    res.json({
      msg: `Server failed to enter a new raffle`,
    });
    console.log("error", error);
  }
});

router.post("/:id/participants", async (req, res, next) => {
  let raffleId = req.params.id;
  req.body.raffle_id = raffleId;

  try {
    const insertQuery = `INSERT INTO users(raffle_id, firstname, lastname,email,phone)
                          VALUES($1,$2,$3,$4,$5)
                          RETURNING firstname, lastname, email, phone
                         `;
    await db.one(insertQuery, [
      req.body.raffle_id,
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.phone,
    ]);
    res.status(201);
    res.json({
      msg: `A new participant has been successfully entered to the raffle.`,
    });
  } catch (error) {
    res.status(500);
    res.json({
      msg: `Server failed to enter a new participant to the raffle`,
    });
    console.log("error", error);
  }
});

router.put("/:id/winner", async (req, res, next) => {
  const raffleId = req.params.id;
  const getRaffleById = `SELECT * FROM raffles WHERE id=$1`;
  const secretToken = req.body.secret_token;
  const secret_token = await db.one(getRaffleById, raffleId);
  let winnerUser = await db.one(
    `SELECT * FROM users WHERE id = $1`,
    getRaffleById.winner_id
  );
  const updateQuery = `SELECT * FROM users INNER JOIN raffles ON raffles.winner_id = users.id WHERE raffles.id = $1`;
  if (secretToken === secret_token) {
    try {
      const winner = await db.any(updateQuery, raffleId);
      console.log("winne", winner);
      res.status(201);
      res.json({
        payload: winner,
        status: "success",
        msg: "Successfully selected a winner",
      });
    } catch (error) {
      res.status(500);
      res.json({
        status: "failed",
        msg: "Something went wrong",
      });
      console.log("error", error);
    }
  }
});

module.exports = router;



