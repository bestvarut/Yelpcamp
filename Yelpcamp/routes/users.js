const express = require('express');
const router = express.Router({ mergeParams: true });
const user = require('../controllers/users')
const passport = require('passport');

const wrapAsync = require('../utils/wrapAsync');


router.get('/register', user.renderRegister)

router.post('/register', wrapAsync(user.register))

router.get('/login', user.renderLogin)

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.login)

router.get('/logout', user.logout)

module.exports = router;