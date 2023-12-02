require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const bodyParser = require("body-parser");
// const wisataRoutes = require("./routes/wisata.js");
// const createWisata = require("./routes/wisata.js");
const wisataRoutes = require("./routes/wisata.js");
const middlewareLogRequest = require("./middleware/logs.js");
const cors = require("cors");
const FileUpload = require("express-fileupload");

app.use(cors());

app.use(FileUpload());

app.use(express.static("public"));

app.use(bodyParser.json());

app.use(middlewareLogRequest);

app.use(wisataRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
