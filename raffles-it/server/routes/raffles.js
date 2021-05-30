var express = require("express");
var router = express.Router();
const db = require("../db/db");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const rafflesQuery = `SELECT * from raffles`;
    const rafflesData = await db.any(rafflesQuery);
    res.status(200);
    res.json({
      payload: rafflesData,
      msg: `The request was successful`,
    });
    console.log("data", rafflesData);
  } catch (error) {
    res.status(500);
    res.json({
      msg: `Failed request there was a problem with the server`,
    });
    console.log("error", error);
  }
});

router.get('/:id', async(req, res, next) => {
  const id = req.params.id
  try {
    const singleRaffleQuery = `SELECT * FROM raffles WHERE id=$1`
    const singleRaffleData = await db.one(singleRaffleQuery, id)
    
    res.status(200)
    res.json({
      payload: singleRaffleData,
      msg: `Successfully retrieved raffle with id #${id}`
    })
  console.log(singleRaffleData)
  } catch (error) {
    res.status(500)
    console.log('ERROR', error)
    res.json({
      msg: `Request has failed`
    })
  }
})

router.get('/:id/participants', async(req,res,next) => {
  const id = req.params.id
  console.log('raf id', id)
  try {
    const participantsQuery =`SELECT users.id, raffle_id,firstname,lastname,email,phone,registered_at FROM users LEFT JOIN raffles ON users.raffle_id = raffles.id WHERE raffles.id =$1`
    const participantsData = await db.any(participantsQuery,id) 
    console.log('participant', participantsData)
    res.status(200)
    res.json({
      payload: participantsData,
      msg: `Successfully retrieved all participants of raffle with id #${id}`
    })
  } catch (error) {
    res.status(500)
    console.log('ERROR', error)
    res.json({
      msg: `Request has failed`
    })
  }
})

router.get('/:id/winner', async(req, res) => {
  const raffleId = req.params.id
  try {
    const winnerQuery = `SELECT * FROM users WHERE id=$1`
    const winnerData = await db.one(winnerQuery, raffleId)
    console.log(winnerData)
    res.status(200)
    res.json({
      payload: winnerData,
      msg: `Successfully retrieved winner`
    })
  } catch (error) {
    res.status(500)
    console.log('ERROR', error)
    res.json({
      msg: `Request has failed`
    })
  }
})

router.post("/", async (req, res, next) => {
  try {
    const insertQuery = `INSERT INTO raffles(name, secret_token)
                          VALUES($1,$2)
                          RETURNING *`;

    const insertData = await db.one(insertQuery, [
      req.body.name,
      req.body.secret_token
    ]);
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
 
  let raffleId = req.params.id
  
  console.log('raffle id',raffleId)
  try {
    const insertQuery = `INSERT INTO users(firstname,lastname,email,phone)
                          VALUES($1,$2,$3,$4)
                         `

    await db.none(insertQuery,[
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.phone,
      raffleId
      ])
    res.status(201);
    res.json({
      payload: [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.phone,
        raffleId
      ],
      msg: `A new participant has been successfully entered to the raffle.`
    });
  } catch (error) {
    res.status(500);
    res.json({
      msg: `Server failed to enter a new participant to the raffle`,
    });
    console.log("error", error);
  }
});

router.put('/:id/winner', async(req, res,next) => {
  const raffleId = req.params.id
  try {
    const updateQuery = `UPDATE raffles SET winner_id = $1 WHERE id =$2 AND secret_token = $3`
    await db.any(updateQuery, [raffleId, req.body.winner_id, req.body.secret_token])
    res.status(201)
    res.json({
      body: req.body.secret_token,
      status:'success',
      msg:'Successfully selected a winner'
    })
  } catch (error) {
      res.status(500)
     res.json({
        status: 'failed',
        msg: 'The incorrect secret token entered'
      })
      console.log("error", error)
  }
})

module.exports = router;
