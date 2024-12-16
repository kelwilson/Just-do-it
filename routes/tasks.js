const express = require('express')
const router = express.Router()
const taskController = require('../controllers/tasks')

router.get('/', taskController.getTasks)
router.post('/createTask', taskController.createTask)





module.exports = router