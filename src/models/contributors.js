
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

    const findOneByEmail = async (data) => {
      try {
        const sql = 'SELECT * FROM contributors WHERE email = ?';
        const [rows] = await connection.execute(sql, [data.email]);
        return rows;
      } catch (error) {
        throw error;
      }
    }

    const findAll = async () => {
      try {
        const sql = 'SELECT * FROM contributors';
        const [rows] = await connection.execute(sql, []);
        return rows;
      } catch (error) {
        throw error;
      }
    }

    const updateOne = async (data, id) => {
      try {
        const sql = 'UPDATE contributors SET name = ? WHERE id = ?';
        const [rows] = await connection.execute(sql, [data.name, id]);
        return rows;
      } catch (error) {
        throw error;
      }
    }

    const remove = async (id) => {
      try {
        const sql = 'DELETE FROM contributors WHERE id = ?';
        const [rows] = await connection.execute(sql, [id]);
        return rows;
      } catch (error) {
        throw error;
      }
    }

    const findLastLocation = async () => {
      try {
        const sql = 'SELECT * FROM contributors c INNER JOIN (SELECT MAX(os.id) max_id, os.contributor_id, os.location FROM order_services os GROUP BY contributor_id, location) c_max ON(c_max.contributor_id = c.id)';
        const [rows] = await connection.execute(sql, []);
        return rows;
      } catch (error) {
        throw error;
      }
    }
  
    return {
      create,
      findLastLocation,
      findOneByEmail,
      updateOne,
      remove,
      findAll
    }
  
  }
  
  module.exports = init