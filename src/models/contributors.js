
const init = connection => {
    const create = async data => {
      try {
        const sql =
          "INSERT INTO contributors (name, email, password) VALUES (?, ?, ?)";
        const [rows] = await connection.execute(sql, [data.name, data.email, data.password]);
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