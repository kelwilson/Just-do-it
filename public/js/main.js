const taskItem = document.querySelectorAll('span.not')
const taskComplete = document.querySelectorAll('span.completed')
const checkButton = document.querySelectorAll('#done')
const editButton = document.querySelectorAll('.fa-pen-to-square')
const trashButton = document.querySelectorAll('.fa-trash-can')


Array.from(taskComplete).forEach(btn => btn.addEventListener('click', markComplete))

// Array.from(taskItem).forEach(btn => btn.addEventListener('click', markComplete))

Array.from(checkButton).forEach(btn => btn.addEventListener('click', markComplete))

// Array.from(editButton).forEach(btn => btn.addEventListener('click', editTask))

// Array.from(trashButton).forEach(btn => btn.addEventListener('click', deleteTask))

// Array.from(checkButton).forEach(btn => btn.addEventListener('click', markInComplete))


// mark complete button
async function markComplete() {
    console.log
    const taskId = this.parentNode.dataset.id
    console.log('yeah we outside', taskId)
    try{
        const response = await fetch('tasks/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'taskIdFromJSFile': taskId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }

}