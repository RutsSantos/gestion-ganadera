const { Connection } = require('tedious');

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

connection.on('connect', function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('db initialized...');
});

// Attempt to connect and execute queries if connection goes through
connection.connect()

module.exports.connection = connection;
