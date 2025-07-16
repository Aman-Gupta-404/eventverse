const express = require("express");
const connectDb = require("./db");
const usersRouter = require("./routes/users");

require("dotenv").config();

const app = express();

connectDb();

app.use(express.json());

// users routes
app.use("/api/v1/users", usersRouter);

const PORT = process.env.PORT ?? 3001;

// liste on the port
app.listen(PORT, () => console.log(`Running app on PORT ${PORT}`));
