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

// Array.from(editButton).forEach(btn => btn.addEventListener('click', editTask))

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
    // Trying to check and uncheck the check box by clicking the task but its not working !!!
    
 })   



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


closeButton.addEventListener('click', close)
overlay.addEventListener('click', close)

function close() {
    overlay.classList.add('hidden')
    editDiv.classList.add('hidden')
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

async function markIncomplete(event){
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

function getId () {
    // const id = event.target.parentNode.dataset.id;
    return  event.target?.parentNode?.dataset.id;
}

// declaring the variable to hold the task Id
let taskId = null;


async function editTask(){
    console.log('we coming')
   

    // const taskId = this.parentNode.dataset.id
    // taskIdField.value = taskId;
    // console.log(taskIdField.value)
    try {

        // const taskId = event.target.parentNode.dataset.id; // Fetch task ID from the clicked element
         taskId = getId()
        console.log("Task ID:", taskId);

        // Fetch task details using async/await
        const response = await fetch(`/tasks/${taskId}`);
        const data = await response.json();
        console.log(data)

        if (data.task) {
          taskInput.value = data.task; // Populate the form with task details
        //   editTaskForm.style.display = "block"; // Show the form
        overlay.classList.remove('hidden')
        editDiv.classList.remove('hidden')
        } else {
          console.error("Task not found");
        }
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    }

    
     // Handle form submission to update the task
    //  editTaskForm.addEventListener("submit", async (event) => {
    //  event.preventDefault();

    async function updateForm() {
        // event.preventDefault();

       editTaskForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent form from reloading the page
        // const updatedTask = {
        // taskName: taskInput.value,
        

        const updatedText= taskInput.value
        // const taskId = '67657ab52e8731c659ab082c'
        // const taskId = getId()
        
        try {
            // const taskId = event.target.parentNode.dataset.id; 
          /* editTaskForm.action = `task/${taskId}/update`; */
            // console.log(taskId)
         // Update task using async/await
        //  const response = await fetch(`/tasks/${taskId}/update`, {
         const response = await fetch(`/tasks/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedText),
        });

        if (response.ok) {
            const updatedTask = await response.json();
            // Update the DOM with the new task text
            taskInput.textContent = updatedTask.text;
            console.log("Task updated successfully:", data);
        } else {
            alert('Failed to update the task');
        }

        // const data = await response.json();
        // console.log("Task updated successfully:", data);

        //   editTaskForm.style.display = "none"; // Hide the form after update
        overlay.classList.add('hidden')
        editDiv.classList.add('hidden')
        } catch (err) {
          console.error("Error updating task:", err);
        }
    })
    }
    
console.log(taskIdField.value)


