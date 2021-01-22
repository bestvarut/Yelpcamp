const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroungSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: String,
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: String,
    location: String
})

module.exports = mongoose.model('Campground', CampgroungSchema);