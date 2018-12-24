const definitions = require('./definitions');
const info = require('./info');
const paths = require('./paths');
const components = require('./components');

let hostUrl = 'PROD_API_URL';

if (!process.env.NODE_ENV) {
  hostUrl = 'localhost:8080';
}

module.exports = {
  swagger: '2.0',
  info,
  host: hostUrl,
  basePath: '/',
  tags: [
    {
      name: 'Users',
      description: 'Endpoints for users endpoints',
    },
    {
      name: 'Auth',
      description: 'Endpoints for register/login',
    },
    {
      name: 'Tweets',
      description: 'Endpoints for tweets',
    },
  ],
  schemes: [
    'http',
    'https',
  ],
  consumes: [
    'application/json',
  ],
  produces: [
    'application/json',
  ],
  securityDefinitions: {
    Bearer: {
      description:
       `For accessing the API a valid JWT token must be passed in all the queries in
       the 'Authorization' header.
       A valid JWT token is generated by the expressJwt and returned on dashboard, after a
       succefull login. It is stored as id_token in localstorage.

       The following syntax must be used in the 'Authorization' header:

        Bearer xxxxxx.yyyyyyy.zzzzzz`,
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  paths: {
    '/register/': paths.auth.register,
    '/login': paths.auth.login,
    '/tweets': paths.tweets['list-tweets'],
    '/tweets/': paths.tweets['post-tweets'],
    '/tweets/{tweetsId}/': paths.tweets['get-tweets'],
    '/users/{userId}': paths.users['get-users'],
  },
  components,
  definitions: {
    Pagination: definitions.Pagination,
    Token: definitions.Token,
    Tweet: definitions.Tweet,
    User: definitions.User,
    401: definitions.Errors[401],
    400: definitions.Errors[400],
    404: definitions.Errors[404],
    500: definitions.Errors[500],
  },
};