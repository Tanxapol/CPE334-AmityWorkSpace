const express = require('express')
const router = express.Router()
const { register, login, currentActor } = require('../controllers/auth')
const { authCheck, adminCheck } = require('../middlewares/authCheck')

router.post('/register', register)
router.post('/login', login)
router.post('/currentActor', authCheck, currentActor)
router.post('/currentAdmin', authCheck, adminCheck, currentActor)

module.exports = router;