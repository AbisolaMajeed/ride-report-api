const pool = require('./config/db');

const createSchema = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS rides (
      id INT AUTO_INCREMENT PRIMARY KEY,
      driver_id INT NOT NULL,
      rider_id INT NOT NULL,
      pickup_location VARCHAR(255) NOT NULL,
      dropoff_location VARCHAR(255) NOT NULL,
      fare DECIMAL(10, 2) NOT NULL,
      status ENUM('completed', 'canceled', 'pending') NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('super_admin', 'admin', 'staff') DEFAULT 'staff',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    const connection = await pool.getConnection();
    // Create the 'rides' table
    await connection.query(createTableQuery);
    console.log('Rides table created successfully.');

    // Create the 'users' table
    await connection.query(createUsersTableQuery);
    console.log('Users table created successfully.');
    connection.release();
  } catch (error) {
    console.error('Error creating schema:', error.message);
  }
};

createSchema();