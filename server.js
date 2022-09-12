const connectDB = require('./db/connection')
const express = require("express");

const cors = require("cors");
const tasks = require("./routes/task");
require("dotenv").config();

const notFound = require('./middleware/notFound');
const errorHandelerMiddleWare = require ('./middleware/error-handeler');
const path = require("path");

 

const app = express();

 app.use(express.static("./frontend"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());


app.use("/api/v1/tasks", tasks);


app.get("/hello", (req, res) => {
  res.send("Task manager app");
});











const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

