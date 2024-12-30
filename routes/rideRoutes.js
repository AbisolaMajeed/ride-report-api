const express = require('express');
const RideController = require('../controllers/rideController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/rides', RideController.getRides);
router.post('/rides', RideController.addRide);
// router.get('/rides/export', RideController.exportRides);

// Export rides route (protected)
router.get('/rides/export', verifyToken, checkRole(['admin', 'super_admin']), RideController.exportRides);


module.exports = router;
