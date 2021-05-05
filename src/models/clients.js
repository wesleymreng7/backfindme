
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

  const findAll = async () => {
    try {
      const sql =
        "SELECT * FROM clients";
      const [rows] = await connection.execute(sql, [data.name]);
      return rows;
    } catch (error) {
      throw error;
    }
  };

  const updateOne = async (data, id) => {
    try {
      const sql =
        "UPDATE FROM clients SET name = ? WHERE id = ?";
      const [rows] = await connection.execute(sql, [data.name, id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  };

  const remove = async (id) => {
    try {
      const sql =
        "DELETE FROM clients WHERE id = ?";
      const [rows] = await connection.execute(sql, [id]);
      return rows;
    } catch (error) {
      throw error;
    }
  };

  return {
    create,
    findAll,
    updateOne,
    remove
  }

}

module.exports = init