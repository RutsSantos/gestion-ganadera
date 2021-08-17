const animales = require('../controllers/animales');

module.exports = function(app){
  app.use('/animales', animales);
}