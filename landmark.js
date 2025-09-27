const express = require('express');
const router = express.Router();

// Hardcoded landmarks for the Seven Sisters (example)
const landmarks = [
    { state: 'Assam', name: 'Kaziranga National Park', lat: 26.5775, lng: 93.1711 },
    { state: 'Meghalaya', name: 'Living Root Bridges', lat: 25.2986, lng: 91.5822 },
    // ... Add more
];

router.get('/nearby', (req, res) => {
    const { lat, lng } = req.query;
    // Simple filter, in real world use geospatial queries
    const nearby = landmarks.filter(lm => (
        Math.abs(lm.lat - lat) < 1 && Math.abs(lm.lng - lng) < 1
    ));
    res.send(nearby);
});

module.exports = router;