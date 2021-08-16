var { Connection, Request } = require('tedious');
const express = require('express');
var cors = require('cors');

const app = express();
const port = 3200;

app.use(cors())
// Create connection to database
const config = {
    authentication: {
        options: {
            userName: "GGAdmin", // update me
            password: "Gestion@Ganadera" // update me
        },
        type: "default"
    },
    server: "gestionganadera.database.windows.net", // update me
    options: {
        database: "DB_GESTION_GANADERA", //update me
        rowCollectionOnRequestCompletion: true,
        encrypt: true
    }
};

const connection = new Connection(config);
// Attempt to connect and execute queries if connection goes through
connection.connect()

connection.on("connect", function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected');
        app.listen(port, () => {
            console.log(`App is listening at http://localhost:${port}`);
        });
    }
});


app.get('/animales', (req, res) => {
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

// function queryDatabase(query) {
//     // Read all rows from table
//     const request = new Request(
//         query,
//         (err, rowCount, rows) => {
//             if (err) {
//                 console.error(err.message);
//             } else {
//                 console.log(`${rowCount} row(s) returned`);
//                 console.log(rows)
//                 data = rows;
//             }
//         }
//     );

//     connection.execSql(request);
//     return data;
// }

// exports.queryDatabase = queryDatabase;