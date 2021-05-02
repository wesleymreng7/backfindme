
const init = connection => {
  const create = async data => {
    try {
      const sql =
        "INSERT INTO clients (name) VALUES (?)";
      const [rows] = await connection.execute(sql, [data.name]);
      return rows.insertId;
    } catch (error) {
      throw error;
    }
  };

  return {
    create,
  }

}

module.exports = init