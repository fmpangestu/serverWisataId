const WisataModel = require("../models/wisata");

const getAllWisata = async (req, res) => {
  try {
    const rows = await WisataModel.getAllWisata();

    res.json({
      message: "Get All Wisata",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createWisata = (req, res) => {
  console.log(req.body);
  res.json({
    message: "Create Wisata",
    data: req.body,
  });
};

module.exports = {
  getAllWisata,
  createWisata,
};
