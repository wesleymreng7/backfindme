
const init = connection => {
    const create = async data => {
      try {
        const sql =
          "INSERT INTO order_services (created_at, description, client_id, contributor_id, location) VALUES (?, ?, ?, ?, ?)";
        const [rows] = await connection.execute(sql, [data.createdAt, data.description, data.clientId, data.contributorId, data.location]);
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

    const findLastLocation = async () => {
      try {
        const sql = 'SELECT * FROM contributors c INNER JOIN (SELECT MAX(id) max_id, contributor_id, location, contributor_id FROM order_services GROUP BY contributor_id) c_max ON(c_max.contributor_id = c.id)';
        const [rows] = await connection.execute(sql, []);
        return rows;
      } catch (error) {
        throw error;
      }
    }
  
    return {
      create,
      findLastLocation,
      findOneByEmail
    }
  
  }
  
  module.exports = init