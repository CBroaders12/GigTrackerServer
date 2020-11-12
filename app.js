require('dotenv').config();
const Express = require('express');
const db = require('./db');

const app = Express();

const middlewares = require('./middlewares');

const controllers = require('./controllers');

db.authenticate()
  .then(() => db.sync())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[server]: App is listening at http://localhost:${process.env.PORT}`)
    });
  })
  .catch((e) => {
    console.log(`[server]: Server Crashed`);
    console.log(e);
  });

