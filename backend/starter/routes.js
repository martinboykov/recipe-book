const graphqlHttp = require('express-graphql');
const graphqlSchema = require('../graphql/schema');
const graphqlReolver = require('../graphql/resolvers');

const error = require('../middleware/error');

module.exports = ((app) => {
  app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlReolver,
    graphiql: true
  }))
  app.use(error);
});

