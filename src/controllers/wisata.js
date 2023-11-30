const WisataModel = require("../models/wisata");

// Pemanggilan ke database bersifat asychronus
const getAllWisata = async (req, res) => {
  try {
    const [data] = await WisataModel.getAllWisata(); // menggunakan await untuk menunggu data dari database

    res.json({
      message: "Connection Succes",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createWisata = async (req, res) => {
  const { body } = req;

  try {
    await WisataModel.createWisata(body);

    res.json({
      message: "Create New Wisata Success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllWisata,
  createWisata,
};
