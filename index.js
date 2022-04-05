 const express = require('express');
 const mongoose = require('mongoose');
 const dbconfig = require('./config/db.config');

 const auth = require('./middleware/auth');
 const errors = require('./middleware/errors');

 const unless = require('express-unless');

 const app = express();

 mongoose.Promise = global.Promise;
 mongoose.connect(dbconfig.db, {
     useNewUrlParser: true,
     useUnifiedTopology: true
 }).then(
     () => {
         console.log('Database Connected Successfully');
     },
     (errors) => {
         console.log("Database can't be connected: " + errors)
     }
 );

 auth.authenticateToken.unless = unless;
 app.use(
     auth.authenticateToken.unless({
         path: [
             { url: "/users/login", method: ["POST"] },
             { url: "/users/register", method: ["POST"] }
         ],
     })
 );

 app.use(express.json());

 app.use("/users", require("./routes/user.routes"));

 app.use(errors.errorHandler);

 app.listen(3000, function() {
     console.log("App Server Is Started!!!!")
 });