const express = require('express');
const router = express.Router();
const campground = require('../controllers/campgrounds')
const Campground = require('../models/campground');
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");

const wrapAsync = require('../utils/wrapAsync');


router.get('/', wrapAsync(campground.index))

router.get('/new', isLoggedIn, campground.renderNewForm)

router.post('/', isLoggedIn, validateCampground, wrapAsync(campground.createCampground))

router.get('/:id', wrapAsync(campground.showCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campground.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, wrapAsync(campground.updateCampground))

router.delete('/:id', isLoggedIn, isAuthor, wrapAsync(campground.deleteCampground))

module.exports = router;