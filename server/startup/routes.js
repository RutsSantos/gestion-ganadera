const animales = require('../controllers/animales');
const estado_animal = require('../controllers/estado_animal');
const empleados = require('../controllers/empleados');
const terceros = require('../controllers/terceros');
const cuenta_bancaria = require('../controllers/cuenta_bancaria');
const estado_empleado = require('../controllers/estado_empleado');
const cargo_empleado = require('../controllers/cargo_empleado');

module.exports = function(app){
  app.use('/animales', animales);
  app.use('/estado_animal', estado_animal);
  app.use('/empleados', empleados);
  app.use('/terceros', terceros);
  app.use('/cuenta_bancaria', cuenta_bancaria);
  app.use('/estado_empleado', estado_empleado);
  app.use('/cargo_empleado', cargo_empleado);
}