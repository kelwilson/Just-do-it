const Task = require('../models/Task')

module.exports = {
    getTasks: async (req,res)=>{
        try{
            const taskItems = await Task?.find()
            const itemsLeft = await Task.countDocuments({completed: false})
            res.render('tasks.ejs', {tasks: taskItems, left: itemsLeft})
        }catch(err){
            console.log(err)
        }
    },
    createTask: async (req, res)=>{
        try{
            await Task.create({task: req.body.taskItem, completed: false})
            console.log('Task has been added!')
            res.redirect('/tasks')
        }catch(err){
            console.log(err)
        }
    },
}