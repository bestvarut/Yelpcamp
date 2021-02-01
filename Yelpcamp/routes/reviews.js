const express = require('express');
const router = express.Router({ mergeParams: true });
const review = require('../controllers/reviews')
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");

const wrapAsync = require('../utils/wrapAsync');


router.post('/', validateReview, isLoggedIn, wrapAsync(review.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(review.deleteReview))

module.exports = router;