// module imports
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// file imports
const APIRouter = require("./controller/index");
const initializeCache = require("./helper/redismanager");

// constants
const PORT = 3001;
const mongodburl =
  "mongodb+srv://dbuser:dbuserpassword@cluster0.itjsp.mongodb.net/test?retryWrites=true&w=majority";

// declarations
const app = express();

// db connection
mongoose
  .connect(mongodburl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    process.exit(1);
  });

// redis connection
initializeCache();

// applying middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", APIRouter);
app.use(
  "/public",
  express.static(path.join(__dirname, "public"), {
    maxAge: 31557600000,
  })
);

// starting server
app.listen(PORT, () => {
  console.log(`Server is running at  http://localhost:${PORT}`);
});

// closing connections on 'CTRL + C'
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "MongoDB connection is disconnected due to application termination"
    );
    process.exit(0);
  });
  initializeCache.exitCache();
});
