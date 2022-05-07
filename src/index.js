import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
import routes from './routes/index.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded())

app.use("/quotes", routes.quotes)
//Incorporating Route

mongoose.connect(process.env.DATABASE_URL, {dbName: "RocketTypeDB"});
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ` + process.env.PORT),
);