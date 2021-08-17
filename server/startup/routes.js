const animales = require('../controllers/animales');
const auth = require('../controllers/auth');
const estado_animal = require('../controllers/estado_animal');

module.exports = function(app){
  app.use('/animales', animales);
  app.use('/auth', auth);
  app.use('/estado_animal', estado_animal);
}
