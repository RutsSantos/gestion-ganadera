const { Request, TYPES } = require('tedious');
const { Router } = require('express');
const { connection } = require('../startup/database');
const router = Router();

router.get('/', (req, res) => {
  const getQuery = "SELECT * FROM empleado";
  const request = new Request(getQuery, (err, rowCount, rows) => {
    if (err) return res.status(500).send('There was an error trying to get the animals');
    if (rowCount === 0) return [];

    let animals = rows.reduce((acc, row) => { 
      const animalObj = {};
      for (column of row) {
        animalObj[column.metadata.colName] = column.value;
      }
      acc.push(animalObj)

      return acc;
    }, []);

    res.send(animals);
  });

  connection.execSql(request);
});

router.post('/', (req, res) => {
  const { id_tercero = null, id_cargo = null, id_estado = null, id_cuenta_bancaria = null } = req.body;
  if (!id_tercero || !id_cargo || !id_estado || !id_cuenta_bancaria)
    return res.status(400).send('the data is not completed as expected');

  const postQuery = `insert into empleado (id_tercero, id_cargo, id_estado, id_cuenta_bancaria)
    values (@id_tercero, @id_cargo, @id_estado, @id_cuenta_bancaria)`;
  const request = new Request(postQuery, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('There was an error trying to post a new empleado');
    }

    return res.send("done")
  });
    
  request.addParameter('id_tercero', TYPES.Int, id_tercero);
  request.addParameter('id_cargo', TYPES.Int, id_cargo);
  request.addParameter('id_estado', TYPES.Int, id_estado);
  request.addParameter('id_cuenta_bancaria', TYPES.Int, id_cuenta_bancaria);

  connection.execSql(request);
});

router.delete('/:id', (req, res) => {

  const deleteQuery = `delete from empleado where id_empleado = ${req.params.id}`;
  const request = new Request(deleteQuery, (err) => {
    if (err) res.status(500).send('There was an error trying to delete a employee');

    return res.send("done")

  });

  const employeeId = Number.parseInt(req.params.id);
  request.addParameter('id_empleado', TYPES.Int, employeeId);

  connection.execSql(request);
});

router.put('/:id', (req, res) => {
  const { id_cargo = null, id_estado = null, id_cuenta_bancaria = null } = req.body;

  if (!id_cargo && !id_estado && !id_cuenta_bancaria)
    return res.status(304).end();
  
  let queryParams = [id_cargo ? 'id_cargo = @id_cargo' : '',
    id_estado ? 'id_estado = @id_estado' : '', id_cuenta_bancaria ? 'id_cuenta_bancaria = @id_cuenta_bancaria' : '']
  
  queryParams = queryParams.reduce((ant, actual) => {
    if (actual) ant.push(actual);
    return ant;
  }, []);


  const putQuery = `update empleado set ${queryParams.toString()} where id_empleado = ${req.params.id}`;


  const request = new Request(putQuery, (err) => {
    console.log(err)
    if (err) res.status(500).send('There was an error trying to post a new animal');
    res.send('The animal was updated succesfully');
  });

  request.addParameter('id_cargo', TYPES.Int, id_cargo);
  request.addParameter('id_estado', TYPES.Int, id_estado);
  request.addParameter('id_cuenta_bancaria', TYPES.Int, id_cuenta_bancaria);
  
  connection.execSql(request);
});

module.exports = router;