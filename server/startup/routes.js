const animales = require('../controllers/animales');
const estado_animal = require('../controllers/estado_animal');
const empleados = require('../controllers/empleados');

module.exports = function(app){
  app.use('/animales', animales);
  app.use('/estado_animal', estado_animal);
  app.use('/empleados', empleados);
}