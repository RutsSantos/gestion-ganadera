const animales = require('../controllers/animales');
const auth = require('../controllers/auth');
const estado_animal = require('../controllers/estado_animal');
const suplidores = require('../controllers/suplidores');
module.exports = function(app){
  app.use('/animales', animales);
  app.use('/auth', auth);
  app.use('/estado_animal', estado_animal);
  app.use('/suplidores', suplidores);
}
