const recipeRoutes = require('../routes/recipe');

const error = require('../middleware/error');

module.exports = ((app) => {
  app.use('/api/recipes', recipeRoutes);
  app.use(error);
});

