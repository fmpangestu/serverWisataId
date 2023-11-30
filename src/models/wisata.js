const dbPool = require("../config/database");

const getAllWisata = () => {
  const sqlQuery = "SELECT * FROM wisata";

  return dbPool.execute(sqlQuery);
};

const createWisata = (body) => {
  const sqlQuery = `INSERT INTO wisata (namaWisata, lokasi, kota,provinsi, kategori, img, ratting) 
                    VALUES ('${body.namaWisata}', '${body.lokasi}', '${body.kota}', '${body.provinsi}', '${body.kategori}', '${body.img}', '${body.ratting}')`;
  return dbPool.execute(sqlQuery);
};

module.exports = {
  getAllWisata,
  createWisata,
};
