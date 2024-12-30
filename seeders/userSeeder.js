const bcrypt = require('bcryptjs');
const pool = require('../config/db'); // Adjust the path as needed
const saltRounds = 10;

const seedUsers = async () => {
  const users = [
    {
        username: 'super_admin_user',
        password: 'superadmin123',
        role: 'super_admin'
    },
    {
        username: 'admin_user',
        password: 'admin123',
        role: 'admin'
    },
    {
        username: 'staff_user',
        password: 'staff123',
        role: 'staff'
    }
  ];

  try {
    const connection = await pool.getConnection();
    
    for (const user of users) {
      // Hash the password before inserting into the database
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      // Insert the user into the database
      await connection.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [user.username, hashedPassword, user.role]
      );
    }

    console.log('Users seeded successfully.');
    connection.release();
  } catch (error) {
    console.error('Error seeding users:', error.message);
  }
};

// Run the seeder
seedUsers();
