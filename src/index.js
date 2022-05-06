import express from 'express';
import cors from 'cors';
// import models from './models';
import routes from './routes/index.js';

const app = express();

// app.use('/session', routes.session);
// app.use('/users', routes.user);
// app.use('/messages', routes.message);
app.use("/quotes", routes.quotes)
//Examples of how to incorporate routes.

app.use(cors());
app.use(express.static('public'));


app.listen(8080, () =>
  console.log(`Example app listening on port 8080!`),
);