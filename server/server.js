require('./startup/database');

const express = require('express');
const cors = require('cors');
const routes = require('./startup/routes');

const app = express();

app.use(express.json());
app.use(cors());
routes(app);


app.listen(3200, () => {
    console.log('App is listening at http://localhost:3200');
});
