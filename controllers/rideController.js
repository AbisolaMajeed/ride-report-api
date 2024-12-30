const RideModel = require('../models/rideModel');
const { exportToCSV } = require('../utils/csvExporter');

class RideController {
  static async getRides(req, res) {
    const { status, driver_id, startDate, endDate, limit = 10, offset = 0 } = req.query;

    try {
      const rides = await RideModel.getAllRides(
        { status, driver_id, startDate, endDate },
        { limit: parseInt(limit), offset: parseInt(offset) }
      );
      res.status(200).json(rides);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch rides' });
    }
  }

  static async addRide(req, res) {
    try {
      const rideId = await RideModel.addRide(req.body);
      res.status(201).json({ message: 'Ride added successfully', rideId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add ride' });
    }
  }

  static async exportRides(req, res) {
    const { status, driver_id, startDate, endDate } = req.query;

    try {
      const rides = await RideModel.getAllRides({ status, driver_id, startDate, endDate });
      const csvFilePath = await exportToCSV(rides, 'rides.csv');
      res.json({
        message: 'Action completed successfully',
        filePath: csvFilePath, // Optional: You can send the file path for reference
      })
      res.download(csvFilePath);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to export rides' });
    }
  }
}

module.exports = RideController;
