const pool = require('../config/db');

// Get user by username
const getUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(query, [username]);
    connection.release();
    return rows[0]; // Return the user
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getUserByUsername };
