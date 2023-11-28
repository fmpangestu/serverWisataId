const connection = require("../config/database");

const getAllWisata = async (err, res) => {
  try {
    const sql = "SELECT * FROM wisata";
    const [rows] = await connection.execute(sql);
    return rows;
  } catch (err) {
    return new Error(`Error in executing query: ${err.message}`);
  }
};

module.exports = {
  getAllWisata,
};
