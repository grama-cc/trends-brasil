const nextRoutes = require('next-routes');

const routes = nextRoutes();

routes.add('home', '/');
routes.add('login', '/login');
routes.add('single', '/single/:id');

module.exports = routes;
