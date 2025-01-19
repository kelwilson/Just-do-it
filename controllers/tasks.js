const Task = require('../models/Task')

module.exports = {
    getTasks: async (req,res)=>{
        try{
            // const taskItems = await Task?.find() // Before auth code 
            const taskItems = await Task?.find({userId:req.user.id})
            // const itemsLeft = await Task.countDocuments({completed: false}) // Before auth code
            const itemsLeft = await Task.countDocuments({userId:req.user.id,completed: false})
            // res.render('tasks.ejs', {tasks: taskItems, left: itemsLeft}, ) // Before auth code 
            res.render('tasks.ejs', {tasks: taskItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createTask: async (req, res)=>{
        try{
            // await Task.create({task: req.body.taskItem, completed: false}) // Before auth code
            await Task.create({task: req.body.taskItem, completed: false, userId: req.user.id })
            console.log('Task has been added!')
            res.redirect('/tasks')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Task.findOneAndUpdate({_id:req.body.taskIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Task.findOneAndUpdate({_id:req.body.taskIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTask: async (req, res)=>{
        console.log(req.body.taskIdFromJSFile)
        try{
            await Task.findOneAndDelete({_id:req.body.taskIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }, 
    // Fetch a single task
    getTaskId: async (req, res) => {
        console.log(req.params.id)
    try {
      const task = await Task.findById(req.params.id);
    //   console.log(task)
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: "Task not found" });
    }
  },
  // Update a task
    updateTask: async (req, res) => {
        console.log(req.params.id)
        console.log(req.body)
    try {
        const updatedTask = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
          })
        // const updatedTask = await Task.findByIdAndUpdate(
        //     req.params.id,
        //     { $set: req.body }, // Use body for updating the document
       z    { new: true } // Return the updated document
        );
        res.json(updatedTask);
        console.log('Updated Successfully !!!')
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the task' });
    }
}
}
