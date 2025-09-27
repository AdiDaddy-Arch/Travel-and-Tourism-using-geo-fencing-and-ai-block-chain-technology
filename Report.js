const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    travelerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Traveler' },
    reportedAt: Date,
    location: {
        lat: Number,
        lng: Number,
    },
    nearbyAuthority: String, // e.g., Police station name
    status: {
        type: String,
        default: 'open',
    }
});

module.exports = mongoose.model('Report', ReportSchema);