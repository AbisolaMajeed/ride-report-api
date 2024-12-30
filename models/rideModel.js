const pool = require('../config/db');

class RideModel {
  static async getAllRides(filters = {}, pagination = { limit: 10, offset: 0 }) {
    const { status, driver_id, startDate, endDate } = filters;
    let query = `SELECT * FROM rides WHERE 1=1`; // Base query
    const params = [];

    if (status) {
      query += ` AND status = ?`;
      params.push(status);
    }

    if (driver_id) {
      query += ` AND driver_id = ?`;
      params.push(driver_id);
    }

    if (startDate && endDate) {
      query += ` AND created_at BETWEEN ? AND ?`;
      params.push(startDate, endDate);
    }

    query += ` LIMIT ? OFFSET ?`;
    params.push(pagination.limit, pagination.offset);

    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async addRide(rideData) {
    const { driver_id, rider_id, pickup_location, dropoff_location, fare, status } = rideData;
    const query = `
      INSERT INTO rides (driver_id, rider_id, pickup_location, dropoff_location, fare, status)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const [result] = await pool.query(query, [
      driver_id,
      rider_id,
      pickup_location,
      dropoff_location,
      fare,
      status,
    ]);
    return result.insertId;
  }
}

module.exports = RideModel;
