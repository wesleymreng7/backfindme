
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

    const findOne = async (data) => {
      try {
        const sql = 'SELECT * FROM contributors WHERE id = ?';
        const [rows] = await connection.execute(sql, [data.id]);
        return rows;
      } catch (error) {
        throw error;
      }
    }

    const findLastLocation = async () => {
      try {
        const sql = 'SELECT * FROM contributors c INNER JOIN (SELECT MAX(id) max_id, location FROM order_services GROUP BY contributor_id) c_max ON(c_max.contributor_id = c.customer_id)';
        const [rows] = await connection.execute(sql, []);
        return rows;
      } catch (error) {
        throw error;
      }
    }
  
    return {
      create,
      findLastLocation,
      findOne
    }
  
  }
  
  module.exports = init