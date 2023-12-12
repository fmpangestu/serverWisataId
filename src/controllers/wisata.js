const WisataModel = require("../models/wisata");
const path = require("path");
const util = require("util");

// Pemanggilan ke database bersifat asychronus
const getAllWisata = async (req, res) => {
  try {
    const [data] = await WisataModel.getAllWisata(); // menggunakan await untuk menunggu data dari database

    res.json({
      message: `Connection Succes. Menampilkan ${data.length} Data Wisata`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getWisataById = async (req, res) => {
  const { id } = req.params;

  try {
    const [data] = await WisataModel.getWisataById(id);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Wisata Tidak Ditemukan" });
    }

    res.json({
      message: `Wisata Ditemukan`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getKota = async (req, res) => {
  try {
    const [data] = await WisataModel.getKota();
    const dataUnik = data.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.kota === item.kota)
    );

    res.json({
      message: `${dataUnik.length} Kota Wisata Ditemukan`,
      data: dataUnik,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getKategori = async (req, res) => {
  try {
    const [data] = await WisataModel.getKategori();
    const dataUnik = data.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.kategori === item.kategori)
    );
    if (data)
      res.json({
        message: `${dataUnik.length} Kategori Wisata Ditemukan`,
        data: dataUnik,
      });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getRating = async (req, res) => {
  try {
    const [data] = await WisataModel.getRating();
    const dataUnik = data.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.rating === item.rating)
    );
    dataUnik.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));

    if (data)
      res.json({
        message: `${dataUnik.length} Rating Wisata Ditemukan`,
        data: dataUnik,
      });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getWisataByKategori = async (req, res) => {
  const { kategori } = req.params;

  try {
    const [data] = await WisataModel.getWisataByKategori(kategori);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Wisata Tidak Ditemukan" });
    }

    res.json({
      message: `${data.length} Wisata Ditemukan`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getWisataByKota = async (req, res) => {
  const { kota } = req.params;

  try {
    const [data] = await WisataModel.getWisataByKota(kota);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Wisata Tidak Ditemukan" });
    }

    res.json({
      message: `${data.length} Wisata Ditemukan`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getWisataByProvinsi = async (req, res) => {
  const { provinsi } = req.params;

  try {
    const [data] = await WisataModel.getWisataByProvinsi(provinsi);

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "Wisata Tidak Ditemukan", error: error });
    }

    res.json({
      message: `${data.length} Wisata Ditemukan`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getWisataByRating = async (req, res) => {
  const { rating } = req.params;
  try {
    const [data] = await WisataModel.getWisataByRating(rating); // menggunakan await untuk menunggu data dari database

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "Wisata Tidak Ditemukan", error: error });
    }
    res.json({
      message: `${data.length} Wisata Ditemukan`,
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
  if (req.files === null)
    return res.status(400).json({ message: "Data Gagal di Upload" });

  const {
    nama_wisata,
    kota,
    provinsi,
    alamat,
    deskripsi,
    kategori,
    latitude,
    longtitude,
    rating,
  } = req.body;

  // foto
  const foto = req.files.foto_wisata;
  const fotoSize = foto.size;
  const ext_foto = path.extname(foto.name);
  const fotoName = foto.md5 + ext_foto;
  const url_foto = `${req.protocol}://${req.get("host")}/images/${fotoName}`;
  const allowedTypeFoto = [".png", ".jpg", ".jpeg"];
  if (!allowedTypeFoto.includes(ext_foto.toLowerCase()))
    return res.status(422).json({ message: "Invalid Image" });
  if (fotoSize > 5000000)
    return res.status(422).json({ message: "Image must be less than 5 MB" });

  // logo_daerah
  const logo = req.files.logo_daerah;
  const logoSize = logo ? logo.size : null;
  const ext_logo = logo ? path.extname(logo.name) : null;
  const logoName = logo ? logo.md5 + ext_logo : null;
  const url_logo = logo
    ? `${req.protocol}://${req.get("host")}/images/${logoName}`
    : null;
  const allowedTypeLogo = [".png"];
  if (logo && !allowedTypeLogo.includes(ext_logo.toLowerCase()))
    return res.status(422).json({ message: "Invalid Logo Image" });
  if (logoSize > 5000000)
    return res
      .status(422)
      .json({ message: "Logo Image must be less than 5 MB" });

  try {
    const moveFoto = util.promisify(foto.mv);
    const moveLogo = logo ? util.promisify(logo.mv) : null;

    await Promise.all([
      moveFoto(`./public/images/${fotoName}`),
      moveLogo ? moveLogo(`./public/images/${logoName}`) : Promise.resolve(),
    ]);

    await WisataModel.createWisata({
      // id: 1,
      nama_wisata: nama_wisata,
      kota: kota,
      provinsi: provinsi,
      alamat: alamat,
      deskripsi: deskripsi,
      foto_wisata: fotoName,
      url_foto: url_foto,
      logo_daerah: logoName,
      url_logo: url_logo,
      kategori: kategori,
      latitude: latitude,
      longtitude: longtitude,
      rating: rating,
    });

    res.status(201).json({ message: "Data Wisata Create Success" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", serverMessage: error });
  }
};

const updateWisata = async (req, res) => {
  const { id } = req.params;
  const { foto_wisata } = req.body;

  // foto
  const foto = req.files.foto_wisata;
  const fotoSize = foto.size;
  const ext_foto = path.extname(foto.name);
  const fotoName = foto.md5 + ext_foto;
  const url_foto = `${req.protocol}://${req.get("host")}/images/${fotoName}`;
  const allowedTypeFoto = [".png", ".jpg", ".jpeg"];
  if (!allowedTypeFoto.includes(ext_foto.toLowerCase()))
    return res.status(422).json({ message: "Invalid Image" });
  if (fotoSize > 5000000)
    return res.status(422).json({ message: "Image must be less than 5 MB" });
  try {
    await updateFotoWisata(id, foto_wisata);
    res.status(200).json({ message: "Foto Wisata Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", serverMessage: error });
  }
};

module.exports = {
  getAllWisata,
  getWisataById,
  getKota,
  getKategori,
  getRating,
  getWisataByKategori,
  getWisataByKota,
  getWisataByProvinsi,
  getWisataByRating,
  createWisata,
  updateWisata,
};
