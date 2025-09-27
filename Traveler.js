const mongoose = require('mongoose');

const TravelerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    location: {
        lat: Number,
        lng: Number,
    },
    geofence: {
        center: {
            lat: Number,
            lng: Number,
        },
        radius: Number, // in meters
    },
    isMissing: {
        type: Boolean,
        default: false,
    },
    lastUpdated: Date
});

module.exports = mongoose.model('Traveler', TravelerSchema);