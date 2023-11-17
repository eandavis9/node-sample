const express = require('express')
const router = express.Router()
const { index, store, update, show, destroy } = require('../controllers/TaskController')


router.route('/').get(index).post(store)
router.route('/:id').get(show).put(update).delete(destroy)

module.exports = router