const express = require('express')
const authRoute = require('./../controller/authController')
const router = express.Router()
router.route('/sighup').post(authRoute.sighup)

module.exports = router