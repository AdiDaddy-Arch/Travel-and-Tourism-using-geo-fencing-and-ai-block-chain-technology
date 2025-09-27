const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const travelerRoutes = require('./routes/traveler');
const reportRoutes = require('./routes/report');
const landmarkRoutes = require('./routes/landmark');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/maargi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api/travelers', travelerRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/landmarks', landmarkRoutes);

app.listen(3000, () => {
    console.log('Maargi backend running on port 3000');
});