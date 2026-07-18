const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors);
app.use(helmet);

module.exports = app;
