const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

router.post('/', async (req, res) => {
    // This would be triggered when a traveler is marked missing
    const report = new Report(req.body);
    await report.save();
    res.send(report);
});

// List all reports
router.get('/', async (req, res) => {
    const reports = await Report.find().populate('travelerId');
    res.send(reports);
});

module.exports = router;