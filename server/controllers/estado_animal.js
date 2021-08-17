const { Request, TYPES } = require('tedious');
const { Router } = require('express');
const { connection } = require('../startup/database');
const router = Router();

router.get('/', (req, res) => {
    const getQuery = "SELECT * FROM estado_animal";
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
    const { descripcion = null } = req.body;

    if (!descripcion)
        return res.status(400).send('the data is not completed as expected');

    const postQuery = `insert into estado_animal (descripcion)
      values (@descripcion)`;
    const request = new Request(postQuery, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('There was an error trying to post a new animal');
        }
    });

    request.on('done', () => res.send('done'));

    // request.addParameter('id_estado_animal', TYPES.Int, id_estado_animal);
    request.addParameter('descripcion', TYPES.VarChar, descripcion);

    connection.execSql(request);
});
router.delete('/:id', (req, res) => {
    console.log(req)
    const deleteQuery = "delete from estado_animal where id_estado_animal = @id";
    const request = new Request(deleteQuery, (err) => {
      if (err) res.status(500).send('There was an error trying to delete a animal');
    });
  
    request.addParameter('id', TYPES.Int, req.params.id);
  
    request.on('done', () => res.send('The animal was deleted succesfully'));
  
    connection.execSql(request);
  });
module.exports = router;

