const mongoose = require('mongoose');

const HousingDataSchema = new mongoose.Schema({
    Latitude: Number,
    Longitude: Number,
    Postcode: String,
    AVG_Price: Number,
    Transfer_Date: String,
});

mongoose.model('HousingData',HousingDataSchema);