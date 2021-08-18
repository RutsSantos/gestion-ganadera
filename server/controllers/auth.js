const { Request, TYPES } = require('tedious');
const bcrypt = require("bcrypt");
const { Router } = require('express');
const { connection } = require('../startup/database');
const router = Router();

router.get('/', (req, res) => {
  const getQuery = `SELECT id_usuario, nombre_usuario, id_tipo_usuario FROM usuario`;

  const request = new Request(getQuery, async (err, rowCount, rows) => {
    if (err) return res.status(500).send('There was an error trying to authenticate the user');
    if (rowCount === 0) return res.status(403).send({ err: 'user not found' });

    let users = rows.reduce((acc, row) => { 
      const userObj = {};
      for (column of row) {
        userObj[column.metadata.colName] = column.value;
      }
      acc.push(userObj)

      return acc;
    }, []);

    return res.send(users)
  });

  connection.execSql(request);
})

router.get('/types', (req, res) => {
  const getQuery = `SELECT * FROM tipo_usuario`;

  const request = new Request(getQuery, async (err, rowCount, rows) => {
    if (err) return res.status(500).send('There was an error trying to get user types');
    if (rowCount === 0) return res.status(403).send({ err: 'user not found' });

    let userTypes = rows.reduce((acc, row) => { 
      const userTypeObj = {};
      for (column of row) {
        userTypeObj[column.metadata.colName] = column.value;
      }
      acc.push(userTypeObj)

      return acc;
    }, []);

    return res.send(userTypes)
  });

  connection.execSql(request);
})

router.post('/login', (req, res) => {
  const { username, password } = req.body

  if (!req.body || !username || !password) {
    return res.status(400).send({
      error: "Invalid",
      message: "Invalid or empty required field"
    })
  }

  const getQuery = `SELECT contrasena FROM usuario WHERE nombre_usuario = @username`;

  const request = new Request(getQuery, async (err, rowCount, rows) => {
    if (err) return res.status(500).send('There was an error trying to authenticate the user');
    if (rowCount === 0) return res.status(403).send({ err: 'user not found' });

    // Replace this with the below line once the DB updates to use the hash, and uncomment the line above
    const validPassword = req.body.password == rows[0][0].value; // await bcrypt.compare(req.body.password, rows[0][0].value);

    return validPassword 
      ? res.status(200).send({ authenticated: validPassword }) 
      : res.status(403).send({ authenticated: validPassword });
  });

  request.addParameter('username', TYPES.VarChar, username);

  connection.execSql(request);
})

router.put('/', async (req, res) => {
  const { username, password, user_type } = req.body

  if (!req.body || !username || !password) {
    return res.status(400).send({
      error: "Invalid",
      message: "Invalid or empty required field"
    })
  }

  // Uncomment and replace the code below once update the password to contain at least 40 chars
  // const salt = await bcrypt.genSalt(10);

  const passwordHash = password // await bcrypt.hash(password, salt);

  const getQuery = `INSERT INTO usuario (nombre_usuario, contrasena, id_tipo_usuario) VALUES (@username, @password, @user_type)`;
  // const getQuery = `SELECT * FROM usuario`;

  const request = new Request(getQuery, (err, rowCount, rows) => {
    if (err) return res.status(500).send('There was an error trying to signup');

    return res.status(200).send(rows)
  });

  request.addParameter('username', TYPES.Text, username);
  request.addParameter('password', TYPES.Text, passwordHash);
  request.addParameter('user_type', TYPES.Int, user_type);

  connection.execSql(request);
})

router.put('/:id', async (req, res) => {
  const { username, password, user_type } = req.body

  console.log(req)

  if (!req.body || !username || !password) {
    return res.status(400).send({
      error: "Invalid",
      message: "Invalid or empty required field"
    })
  }

  // Uncomment and replace the code below once update the password to contain at least 40 chars
  // const salt = await bcrypt.genSalt(10);

  const passwordHash = password // await bcrypt.hash(password, salt);

  const getQuery = `UPDATE usuario SET nombre_usuario=@username, contrasena=@password, id_tipo_usuario=@user_type WHERE id_usuario=@id`;

  const request = new Request(getQuery, (err, rowCount, rows) => {

    console.log(err)
    if (err) return res.status(500).send('There was an error trying to signup');

    return res.status(200).send(rows)
  });

  request.addParameter('username', TYPES.Text, username);
  request.addParameter('password', TYPES.Text, passwordHash);
  request.addParameter('user_type', TYPES.Int, user_type);
  request.addParameter('id', TYPES.Int, req.params.id);

  connection.execSql(request);
  
})

module.exports = router;
