const { Request, TYPES } = require('tedious');
const bcrypt = require("bcrypt");
const { Router } = require('express');
const { connection } = require('../startup/database');
const router = Router();

router.post('/login', (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).send({
      error: "Invalid",
      message: "Invalid or empty required field"
    })
  }

  const getQuery = `SELECT contraseña FROM usuario WHERE nombre_usuario = ${req.body.username}`;

  const request = new Request(getQuery, async (err, rowCount, rows) => {
    if (err) return res.status(500).send('There was an error trying to authenticate the user');
    if (rowCount === 0) return res.status(403).send({ err: 'user not found' });  

    rows = [
      { "contraseña": "123" }
    ]; // test password, please remove after fixing bugs and DB structure

    // Replace this with the below line once the DB updates to use the hash, and uncomment the line above
    const validPassword = req.body.password == rows[0]['contraseña']; // await bcrypt.compare(req.body.password, rows[0]['contraseña']);

    return res.status(200).send({ authenticated: validPassword });
  });

  connection.execSql(request);
})

router.post('/signup', async (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).send({
      error: "Invalid",
      message: "Invalid or empty required field"
    })
  }

  // const salt = await bcrypt.genSalt(10);

  // Replace this with the below line once the DB updates to use the hash, and uncomment the line above
  // Username (nombre_usuario) has to be unique
  const password = req.body.password // await bcrypt.hash(req.body.password, salt);

  const getQuery = `INSERT INTO usuario (nombre_usuario, contraseña) VALUES ('${req.body.username}', '${password}')`;

  const request = new Request(getQuery, (err, rowCount, rows) => {
    if (err) return res.status(500).send('There was an error trying to get the animals');
    if (rowCount === 0) return [];

    return res.status(200).send()
  });

  connection.execSql(request);
})

module.exports = router;
