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
  // let winner = winnerData[Math.floor(Math.random() * winnerData.length)];
  if (winnerData.length >= 1) {
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
                          VALUES($/name/,$/secret_token/,$/created_at/)
                          RETURNING *`;

    const raffleData = {
      name: req.body.name,
      secret_token: req.body.secret_token,
      created_at: new Date().toISOString(),
    };
    const newRaffle = await db.one(insertQuery, raffleData);
    res.status(201);
    res.json({
      payload: newRaffle,
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

  const user = req.body

  const newUser = {
    registered_at: new Date().toISOString(),
    raffle_id: raffleId,
    ...user
  }

  try {
    const insertQuery = `INSERT INTO users(raffle_id, firstname, lastname, email, ${newUser.phone ? "phone, " : ""} registered_at)
        VALUES($/raffle_id/, $/firstname/, $/lastname/, $/email/, ${newUser.phone ? "$/phone/, " : ""} $/registered_at/);`;
    await db.none(insertQuery, newUser);
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
  const raffledTime = new Date().toISOString();
  req.body.raffled_at = raffledTime;
  // if (req.body.winner_id === null) {
    try {
      const randomQuery = `SELECT * FROM users WHERE raffle_id = $1
                        OFFSET floor(random() * (
                    SELECT COUNT(*) FROM users WHERE raffle_id = $1)
                    ) LIMIT 1;
                        `                   
      const randomUser = await db.one(randomQuery, raffleId)
      const updateQuery = `UPDATE raffles 
          SET 
            winner_id = $/winner_id/, 
            raffled_at = $/raffled_at/
          WHERE id = $/id/ 
        RETURNING *`;

       let raffle = {
        id: raffleId,
        winner_id: randomUser.id,
        raffled_at: new Date().toISOString()
      }
      
      await db.one(updateQuery, raffle);
      res.status(201);
      res.json({
        payload: randomUser,
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
  // }else{
  //   console.log('there was a problem')
  // }
});
module.exports = router;
