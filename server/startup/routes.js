const animales = require('../controllers/animales');
const auth = require('../controllers/auth');

module.exports = function(app){
  app.use('/animales', animales);
  app.use('/auth', auth);
}