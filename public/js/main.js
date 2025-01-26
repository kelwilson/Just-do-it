const taskItem = document.querySelectorAll('span.not')
const taskComplete = document.querySelectorAll('span.completed')
const checkButton = document.querySelectorAll('#done')
const editButton = document.querySelectorAll('.fa-pen-to-square')
const trashButton = document.querySelectorAll('.fa-trash-can')
const taskContainer = document.querySelectorAll('.taskItem')
const checkButtons = document.querySelectorAll('input[type="checkbox"]')
const overlay = document.querySelector('.overlay')
const closeButton = document.querySelector('.fa-rectangle-xmark')
const editDiv = document.querySelector('.edit-div')
const editTaskForm = document.getElementById("editTaskForm");
const taskInput = document.getElementById("taskInput");
const taskIdField = document.getElementById("taskId");
const updatebutton = document.getElementById('update-form')



Array.from(taskComplete).forEach(btn => btn.addEventListener('click', markIncomplete))

Array.from(taskItem).forEach(btn => btn.addEventListener('click', markComplete))

Array.from(checkButton).forEach(btn => btn.addEventListener('change', toggleCheckbox))

Array.from(trashButton).forEach(btn => btn.addEventListener('click', deleteTask))

Array.from(editButton).forEach(btn => btn.addEventListener('click', editTask))

updatebutton.addEventListener('click', updateForm )

//checking to see if task are marked complete and changing the attribute of the checkbox accordingly
// Trying to check and uncheck the check box by clicking the task but its not working !!!
Array.from(taskContainer).forEach((el)=> {
    const text = el.querySelector('span.not'); // Select the text within the item
    const checkbox = el.querySelector('input[type="checkbox"]'); // Find the corresponding checkbox
    
    // Add a click event listener to the text
    text?.addEventListener('click', () => {
        checkbox.checked = !checkbox.checked; // Toggle the checkbox state
        console.log(`Checkbox state: ${checkbox.checked ? 'Checked' : 'Unchecked'}`);
    });
    
 })   



// Best part of my code where i check and updated the checkbox and completed task values
// checking if checked is true on the checkbox and updating it accordingly
function toggleCheckbox(event) {
   const btn = event.target
if(btn.checked) {
    markComplete()
} else {
    markIncomplete()
}
}


// close modal and overlay eventlistener
closeButton.addEventListener('click', close)
overlay.addEventListener('click', close)

// close modal function
function close() {
    overlay.classList.add('hidden')
    editDiv.classList.add('hidden')
}


// mark complete button
async function markComplete() {
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


// un-mark a item function
async function markIncomplete(event){
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


// delete task function
async function deleteTask(){
    const taskId = this.parentNode.dataset.id
    try{
        const response = await fetch('tasks/deleteTask', {
            method: 'delete',
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


// getting the task id function
function getId () {
    return  event.target?.parentNode?.dataset.id;
}


// declaring the variable to hold the task Id
let taskId = null;

// getting the taskid and inserting the task into the form 
async function editTask(){
    console.log('we coming')

    try {

         taskId = getId()
        console.log("Task ID:", taskId);

        // Fetch task details using async/await
        const response = await fetch(`/tasks/${taskId}`);
        const data = await response.json();
        console.log(data)

        if (data.task) {
          taskInput.value = data.task; // Populate the form with task details
        overlay.classList.remove('hidden')
        editDiv.classList.remove('hidden')
        } else {
          console.error("Task not found");
        }
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    }


    // update task form function
    async function updateForm(e) {
        
        e.preventDefault(); // Prevent form from reloading the page
 
        editDiv.dataset.id = taskId
    

        // getting the updated text from the input form
        const updatedText= {task: taskInput.value}
        
        try {

         const response = await fetch(`/tasks/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedText),
        });

        if (response.ok) {
            const updatedTask = await response.json();
            // Update the DOM with the new task text
            taskInput.textContent = updatedTask.text;
            console.log("Task updated successfully: ",  updatedTask);
            location.reload()
        } else {
            alert('Failed to update the task');
        }

        overlay.classList.add('hidden')
        editDiv.classList.add('hidden')
        } catch (err) {
          console.error("Error updating task:", err);
        }
    }
    



