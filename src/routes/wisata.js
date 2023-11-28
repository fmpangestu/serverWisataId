const express = require("express");
const wisataController = require("../controllers/wisata.js");
const router = express.Router();

// READ - GET
router.get("/", wisataController.getAllWisata);

// CREATE - POST
router.post("/", wisataController.createWisata);

module.exports = router;
