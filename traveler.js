const express = require('express');
const router = express.Router();
const Traveler = require('../models/Traveler');

// Register new traveler
router.post('/', async (req, res) => {
    const traveler = new Traveler(req.body);
    await traveler.save();
    res.send(traveler);
});

// Update traveler location
router.put('/:id/location', async (req, res) => {
    const { lat, lng } = req.body;
    const traveler = await Traveler.findById(req.params.id);

    if (!traveler) return res.status(404).send('Traveler not found');

    traveler.location = { lat, lng };
    traveler.lastUpdated = new Date();

    // Check geofence
    const distance = getDistanceFromLatLonInM(
        lat, lng,
        traveler.geofence.center.lat,
        traveler.geofence.center.lng
    );

    if (distance > traveler.geofence.radius) {
        traveler.isMissing = true;
        // Here, trigger report to local authority (see below)
    } else {
        traveler.isMissing = false;
    }

    await traveler.save();
    res.send(traveler);
});

// Helper: calculate distance between two points (Haversine formula)
function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Radius of the earth in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        0.5 - Math.cos(dLat)/2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        (1 - Math.cos(dLon))/2;

    return R * 2 * Math.asin(Math.sqrt(a));
}

module.exports = router;