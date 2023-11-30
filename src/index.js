require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const wisataRoutes = require("./routes/wisata.js");
const createWisata = require("./routes/wisata.js");
const middlewareLogRequest = require("./middleware/logs.js");

app.use(bodyParser.json());

app.use(middlewareLogRequest);

app.use("/get/wisata", wisataRoutes);

app.use("/post/wisata", createWisata);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
