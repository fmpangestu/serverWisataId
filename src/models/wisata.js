const dbPool = require("../config/database");

const getAllWisata = () => {
  const sqlQuery = "SELECT * FROM wisata";

  return dbPool.execute(sqlQuery);
};

const getWisataByKota = (kota) => {
  const sqlQuery = "SELECT * FROM wisata WHERE kota = ?";

  return dbPool.execute(sqlQuery, [kota]);
};

const getWisataByProvinsi = (provinsi) => {
  const sqlQuery = "SELECT * FROM wisata WHERE provinsi = ?";

  return dbPool.execute(sqlQuery, [provinsi]);
};

const createWisata = (body) => {
  try {
    const sqlQuery = `INSERT INTO wisata (
      nama_wisata, kota, provinsi, alamat, deskripsi, foto_wisata, url_foto,
      logo_daerah, url_logo, kategori, latitude, longtitude, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      body.nama_wisata,
      body.kota,
      body.provinsi,
      body.alamat,
      body.deskripsi,
      body.foto_wisata,
      body.url_foto,
      body.logo_daerah,
      body.url_logo,
      body.kategori,
      body.latitude,
      body.longtitude,
      body.rating,
    ];

    return dbPool.execute(sqlQuery, values);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllWisata,
  getWisataByKota,
  getWisataByProvinsi,
  createWisata,
};
