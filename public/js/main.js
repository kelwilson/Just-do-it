const taskItem = document.querySelectorAll('span.not')
const taskComplete = document.querySelectorAll('span.completed')
const checkButton = document.querySelectorAll('#done')
const editButton = document.querySelectorAll('.fa-pen-to-square')
const trashButton = document.querySelectorAll('.fa-trash-can')


Array.from(taskComplete).forEach(btn => btn.addEventListener('click', markIncomplete))

Array.from(taskItem).forEach(btn => btn.addEventListener('click', markComplete))

Array.from(checkButton).forEach(btn => btn.addEventListener('change', toggleCheckbox))

// Array.from(editButton).forEach(btn => btn.addEventListener('click', editTask))

// Array.from(trashButton).forEach(btn => btn.addEventListener('click', deleteTask))

// Array.from(checkButton).forEach(btn => btn.addEventListener('click', markInComplete))

//checking to see if task are marked complete and changing the attribute of the checkbox accordingly



// Best part of my code where i check and updated the checkbox and completed task values
// checking if checked is true on the checkbox and updating it accordingly
function toggleCheckbox(event) {
    console.log('wow')
   const btn = event.target
if(btn.checked) {
    console.log('lets go')
    markComplete()
} else {
    console.log('not again')
    markIncomplete()
}
}



// mark complete button
async function markComplete() {
    // const taskId = this.parentNode?.dataset.id
     const taskId = event.currentTarget.closest('.taskItem')?.dataset.id;
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

async function markIncomplete(){
    // const taskId = this.parentNode?.dataset.id
    const taskId = event.currentTarget.closest('.taskItem')?.dataset.id;
    console.log('yeah we back', taskId)
    
    try{
        const response = await fetch('tasks/markIncomplete', {
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