const { Request, TYPES } = require('tedious');
const { Router } = require('express');
const { connection } = require('../startup/database');
const router = Router();

router.get('/', (req, res) => {
  const getQuery = "SELECT * FROM tercero";
  const request = new Request(getQuery, (err, rowCount, rows) => {
    if (err) return res.status(500).send('There was an error trying to get the terceros');
    if (rowCount === 0) return [];

    let terceros = rows.reduce((acc, row) => { 
      const animalObj = {};
      for (column of row) {
        animalObj[column.metadata.colName] = column.value;
      }
      acc.push(animalObj)

      return acc;
    }, []);

    return res.send(terceros);
  });

  connection.execSql(request);
});

router.post('/', (req, res) => {
  const { nombre = null } = req.body;
  if (!nombre)
    return res.status(400).send('the data is not completed as expected');

  const postQuery = `insert into tercero (nombre)
    values (@nombre)`;
  const request = new Request(postQuery, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('There was an error trying to post a new animal');
    }

    return res.send("done")
  });
    
  request.addParameter('nombre', TYPES.VarChar, nombre);

  connection.execSql(request);
});

router.delete('/:id', (req, res) => {

  const deleteQuery = `delete from tercero where id_tercero = ${req.params.id}`;
  const request = new Request(deleteQuery, (err) => {
    if (err) res.status(500).send('There was an error trying to delete a animal');

    return res.send("done")

  });

  const animalId = Number.parseInt(req.params.id);
  request.addParameter('id_tercero', TYPES.Int, animalId);

  connection.execSql(request);
});

router.put('/:id', (req, res) => {
  const { nombre = null} = req.body;

  if (!nombre)
    return res.status(304).end();

  const putQuery = `update tercero set nombre = @nombre where id_tercero = ${req.params.id}`;


  const request = new Request(putQuery, (err) => {
    if (err) res.status(500).send('There was an error trying to post a new tercero');
    res.send('The tercero was updated succesfully');
  });

  request.addParameter('nombre', TYPES.VarChar, nombre);
  
  connection.execSql(request);
});

module.exports = router;