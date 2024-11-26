const express = require('express')
const router = express.Router()
const { create, list, read, remove } = require('../controllers/role')

router.post('/create', create)
router.get('/list', list)
router.get('/read/:id', read)
router.delete('/remove/:id', remove)

module.exports = router;