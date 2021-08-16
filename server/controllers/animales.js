const { Request, TYPES } = require('tedious');
const { Router } = require('express');
const { connection } = require('../startup/database');
const router = Router();

router.get('/', (req, res) => {
  const getQuery = "SELECT * FROM animal";
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
  const { nombre = null, nacimiento = null, id_genotipo = null, id_estado_animal = null } = req.body;

  if (!nombre || !nacimiento || !id_genotipo || !id_estado_animal)
    return res.status(400).send('the data is not completed as expected');

  const postQuery = `insert into animal (nombre, nacimiento, id_genotipo, id_estado_animal)
    values (@nombre, @nacimiento, @id_genotipo, @id_estado_animal)`;
  const request = new Request(postQuery, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('There was an error trying to post a new animal');
    }
  });

  request.on('done', () => res.send('done'));
    
  request.addParameter('nombre', TYPES.VarChar, nombre);
  request.addParameter('nacimiento', TYPES.Date, nacimiento);
  request.addParameter('id_genotipo', TYPES.Int, id_genotipo);
  request.addParameter('id_estado_animal', TYPES.Int, id_estado_animal);

  connection.execSql(request);
});

router.delete('/:id', (req, res) => {
  const deleteQuery = "delete from animal where id = @id";
  const request = new Request(deleteQuery, (err) => {
    if (err) res.status(500).send('There was an error trying to delete a animal');
  });

  request.addParameter('id', TYPES.Int, req.params.id);

  request.on('done', () => res.send('The animal was deleted succesfully'));

  connection.execSql(request);
});

router.put('/:id', (req, res) => {
  const { nombre = null, nacimiento = null, id_genotipo = null, id_estado_animal = null } = req.body;

  if (!nombre && !nacimiento && !id_genotipo && !id_estado_animal)
    return res.status(304).end();
  
  const queryParams = []
  nose.push(nombre ? 'nombre = @nombre' , !nacimiento ?? 'nacimiento = @nacimiento,',
    !id_genotipo ?? 'id_genotipo = @id_genotipo', !id_estado_animal ?? 'id_estado_animal = @id_estado_animal');

  const putQuery = `update animal set ${queryParams.toString()} where id =@id`;

  const request = new Request(putQuery, (err) => {
    if (err) res.status(500).send('There was an error trying to post a new animal');
  });
  
  request.addParameter('id', TYPES.Int, req.params.id);
  request.addParameter('nombre', TYPES.VarChar, nombre);
  request.addParameter('nacimeinto', TYPES.Date, nacimiento);
  request.addParameter('id_genotipo', TYPES.Int, id_genotipo);
  request.addParameter('id_estado_animal', TYPES.Int, id_estado_animal);
  
  request.on('done', () => res.send('The animal was updated succesfully'));

  connection.execSql(request);
});

module.exports = router;