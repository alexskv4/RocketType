express = require('express');
require("dotenv/config");

// import models from './models';
// import routes from './routes';

const app = express();

// app.use('/session', routes.session);
// app.use('/users', routes.user);
// app.use('/messages', routes.message);

//Examples of how to incorporate routes.


app.use(express.static('public'))


app.listen(8080, () =>
  console.log(`Example app listening on port 8080!`),
);