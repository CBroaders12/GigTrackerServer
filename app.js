require('dotenv').config();
const Express = require('express');
const db = require('./db');

const app = Express();

const middlewares = require('./middlewares');

const controllers = require('./controllers');

//* Middleware
app.use(Express.json())
app.use(middlewares.CORS);

//* Unverified routes
app.use('/user', controllers.User);

//* Verified Routes
// General user routes
app.use('/music', middlewares.ValidateJWT, controllers.Music);
app.use('/gig', middlewares.ValidateJWT, controllers.Gig);

// Admin routes
app.use('/admin', controllers.Admin);


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

