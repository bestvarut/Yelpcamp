const express = require('express');
const router = express.Router();
const campground = require('../controllers/campgrounds')
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");

const wrapAsync = require('../utils/wrapAsync');
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage });

router.route('/')
    .get(wrapAsync(campground.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, wrapAsync(campground.createCampground))


router.get('/new', isLoggedIn, campground.renderNewForm)

router.route('/:id')
    .get(wrapAsync(campground.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, wrapAsync(campground.updateCampground))
    .delete(isLoggedIn, isAuthor, wrapAsync(campground.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campground.renderEditForm))

module.exports = router;