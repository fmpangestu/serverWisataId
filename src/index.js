const express = require("express");
const app = express();
const port = 4000;

const bodyParser = require("body-parser");
const wisataRoutes = require("./routes/wisata.js");
const middlewareLogRequest = require("./middleware/logs.js");

app.use(bodyParser.json());

app.use(middlewareLogRequest);

app.use("/wisata", wisataRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
