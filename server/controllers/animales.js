const { Request } = require('tedious');
const { Router } = require('express');
const { connection } = require('../startup/database');
const router = Router();

router.get('/animales', (req, res) => {
  const animalsQuery = "SELECT * FROM animal";
  const request = new Request(animalsQuery, (err, rowCount, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(`${rowCount} row(s) returned`);
      console.log(rows)
      res.send(rows)
    }
  });

  request.on("row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  connection.execSql(request);
})

module.exports = router;