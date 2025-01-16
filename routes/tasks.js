const express = require('express')
const router = express.Router()
const taskController = require('../controllers/tasks')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, taskController.getTasks)
router.get('/:id', taskController.getTaskId)
router.post('/createTask', taskController.createTask)
router.put('/markComplete', taskController.markComplete)
router.put('/markIncomplete', taskController.markIncomplete)
router.delete('/deleteTask', taskController.deleteTask)
router.put('/:id', taskController.updateTask)




module.exports = router