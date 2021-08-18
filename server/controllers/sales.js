const { Request, TYPES } = require('tedious');
const { Router } = require('express');
const { connection } = require('../startup/database');
const router = Router();

router.get('/', (req, res) => {
  const getQuery = 'SELECT * FROM produccion';
  const request = new Request(getQuery, (err, rowCount, rows) => {
    if (err) return res.status(500).send('There was an error trying to get the sales');
    // if (rowCount === 0) return [];

    let sales = rows.reduce((acc, row) => {
      const saleObj = {};
      for (column of row) {
        saleObj[column.metadata.colName] = column.value;
      }
      acc.push(saleObj);

      return acc;
    }, []);

    res.send(sales);
  });

  connection.execSql(request);
});

router.post('/', (req, res) => {
  const { fecha = null, cantidad = null } = req.body;

  if (!fecha || !cantidad) return res.status(400).send('the data is not completed as expected');

  const postQuery = `insert into produccion (fecha, cantidad)
    values (@fecha, @cantidad)`;
  const request = new Request(postQuery, err => {
    if (err) {
      console.error(err);
      res.status(500).send('There was an error trying to post a new sale');
      return;
    }

    res.send('done');
  });

  request.addParameter('fecha', TYPES.Date, fecha);
  request.addParameter('cantidad', TYPES.Int, cantidad);

  connection.execSql(request);
});

router.delete('/:id', (req, res) => {
  const deleteQuery = 'delete from produccion where id_produccion = @id';
  const request = new Request(deleteQuery, err => {
    if (err) res.status(500).send('There was an error trying to delete a sale');
    res.send('The sale was deleted succesfully');
  });

  const saleId = Number.parseInt(req.params.id);
  request.addParameter('id', TYPES.Int, saleId);

  connection.execSql(request);
});

router.put('/:id', (req, res) => {
  const { fecha = null, cantidad = null, id_produccion = null } = req.body;

  if (!fecha || !cantidad || !id_produccion) return res.status(304).end();

  let queryParams = [fecha ? 'fecha = @fecha' : '', cantidad ? 'cantidad = @cantidad' : ''];

  queryParams = queryParams.reduce((ant, actual) => {
    if (actual) ant.push(actual);
    return ant;
  }, []);

  const putQuery = `update produccion set ${queryParams.toString()} where id_produccion = @id`;

  const request = new Request(putQuery, err => {
    console.log(err);
    if (err) return res.status(500).send('There was an error trying to post a new sale');
    res.send('The sale was updated succesfully');
  });

  const saleId = Number.parseInt(req.params.id);
  request.addParameter('id', TYPES.Int, saleId);
  request.addParameter('fecha', TYPES.Date, fecha);
  request.addParameter('cantidad', TYPES.Int, cantidad);

  connection.execSql(request);
});

module.exports = router;
