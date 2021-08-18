const animales = require('../controllers/animales');
const sales = require('../controllers/sales');

module.exports = function(app){
  app.use('/sales', sales);
  app.use('/animales', animales);
}