const { Request, TYPES } = require("tedious");
const { Router } = require("express");
const { connection } = require("../startup/database");
const router = Router();

router.get("/", (req, res) => {
    const getQuery = "SELECT empresa.id_empresa, tercero.nombre, empresa.rnc FROM empresa inner join tercero on empresa.id_tercero = tercero.id_tercero";
    const request = new Request(getQuery, (err, rowCount, rows) => {
      if (err) return res.status(500).send('There was an error trying to get the suplier');
      if (rowCount === 0) return [];
  
      let empresas = rows.reduce((acc, row) => { 
        const empresaObj = {};
        for (column of row) {
          empresaObj[column.metadata.colName] = column.value;
        }
        acc.push(empresaObj)
  
        return acc;
      }, []);
  
      res.send(empresas);
    });
  
    connection.execSql(request);
});


router.post("/", (req, res) => {
    const { nombre = null, id_tercero = null, rnc = null } = req.body;
  if (!nombre || !rnc) {
    return res.status(400).send('the data is not completed as expected');
  }

  const postQuery = `insert into empresa (id_tercero, rnc)
    values (@id_tercero, @rnc)`;
    const request = new Request(postQuery, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('There was an error trying to post a new suplier');
    }

    request.addParameter('id_tercero', TYPES.Int, id_tercero);
    request.addParameter('rnc', TYPES.Int, rnc);
  
    connection.execSql(request);
})
});

router.delete("/:id", (req, res) => {
    const deleteQuery = `delete from empresa where id_empresa = ${req.params.id}`;
    const request = new Request(deleteQuery, (err) => {
      if (err) res.status(500).send('There was an error trying to delete a suplier');
  
      return res.send("done")
  
    });
  
    const employeeId = Number.parseInt(req.params.id);
    request.addParameter('id_empresa', TYPES.Int, employeeId);
  
    connection.execSql(request);
});

module.exports = router;
