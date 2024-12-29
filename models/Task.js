const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: String,
        required: true
      }
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
    },
    { timestamps: 
    { createdAt: 'created_at' } 
    },
    
)
module.exports = mongoose.model('Task', TaskSchema)