const mongoose = require('mongoose');
const Review = require('./review')
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
    location: String,

    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

CampgroungSchema.post('findOneAndDelete', async function (doc) {
    console.log(doc)
    if (doc) {
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroungSchema);