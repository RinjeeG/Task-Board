// Retrieve tasks and nextId from localStorage
// added || [], to add an empty arry if tasks are not found
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));


// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

document.addEventListener('DOMContentLoaded', function() {
    // Ensure the modal element exists before attaching the event listener
    var myModal = document.getElementById('formModal');
    myModal.addEventListener('shown.bs.modal', function () {
        // This ensures the modal is fully shown and the DOM within is accessible
        var form = document.getElementById('addTaskForm');
        
        // Initialize or re-initialize taskList each time the modal is opened
        let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
        
        form.addEventListener('submit', function(event) {
            handleAddTask(event, taskList); // Pass event and taskList to your handler
        });
    });
});

// Todo: create a function to handle adding a new task
function handleAddTask(event, taskList){
    event.preventDefault();

    const newTasks= {
        taskTitle: document.getElementById('taskTitle').value,
        taskDueDate: document.getElementById('taskDueDate').value,
        taskDescription: document.getElementById('taskDescription').value
    };

    console.log(document.getElementById('taskTitle').value);

    console.log(newTasks);

    taskList.push(newTasks);

    localStorage.setItem('tasks', JSON.stringify(taskList));
    alert('Task list saved');
    // if there is no tasks in localStorage create a new task array
    
// add task to js array
// update local storage
// update display
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
