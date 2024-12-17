const express = require('express')
const router = express.Router()
const taskController = require('../controllers/tasks')

router.get('/', taskController.getTasks)
router.post('/createTask', taskController.createTask)
router.put('/markComplete', taskController.markComplete)
router.put('/markIncomplete', taskController.markIncomplete)
router.delete('/deleteTask', taskController.deleteTask)





module.exports = router