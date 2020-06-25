const recipeRoutes = require('../routes/recipe');
const error = require('../middleware/error');

const typeDefs = require('../graphql/schema');
const resolvers = require('../graphql/resolvers');
const { ApolloServer } = require('apollo-server-express');


const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
});

module.exports = ((app) => {
  server.applyMiddleware({ app });
  app.use('/api/recipes', recipeRoutes);
  app.use(error);
});

