const next = require('next');
const express = require('express');
const routes = require('./routes');

// const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';


console.log(process.env)

const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare()
  .then(() => {
    const server = express();

    // Resolve trailing slash
    server.use((req, res, _next) => {
      if (req.path.substr(-1) === '/' && req.path.length > 1) {
        const query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
      } else {
        _next();
      }
    });

    server.use(handler);

    server.listen(port, (error) => {
      console.log(2, error);
      //if (err) throw err;
      console.log(`🌎 > Ready on port ${port}`); // eslint-disable-line no-console
    });
  })
  .catch((error) => {
    console.log(1, error);
  });
