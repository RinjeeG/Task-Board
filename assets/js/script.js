// Retrieve tasks and nextId from localStorage
// added || [], to add an empty arry if tasks are not found
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));


// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timeStamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `${timeStamp}-${random}`;

}

// Todo: create a function to create a task card
function createTaskCard(taskList) {
    const taskId = generateTaskId();
    const taskCard = $('<div>').addClass('task-card draggable my-3');
    const cardHeader = $('<div>').addClass('card-header h3').text(taskList.taskTitle);
    const cardBody = $('<div>').addClass('card-body');
    const cardDueDate = $('<div>').addClass('card-due-date h3').text(taskList.taskDueDate);
    const cardDescription = $('<p>').addClass('card-description').text(taskList.taskDescription);

    const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-card-id', taskId);
    cardDeleteBtn.on('click', handleDeleteTask);

    cardBody.append(cardDueDate,cardDescription,cardDeleteBtn);

    taskCard.append(cardHeader, cardBody);
    $('#todo-cards').append(taskCard);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $('#todo-cards').empty();

    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        $('#todo-cards').append(taskCard);
    });
    
    // display task cards in the to do list
    // add delete bttn

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
        taskId: generateTaskId(),
        taskTitle: document.getElementById('taskTitle').value,
        taskDueDate: document.getElementById('taskDueDate').value,
        taskDescription: document.getElementById('taskDescription').value
    };

    console.log(newTasks);

    taskList.push(newTasks);

    localStorage.setItem('tasks', JSON.stringify(taskList));
    alert('Task list saved');

    // close modalk after adding task
    const myModal = document.getElementById('formModal');
    const modalInstance = bootstrap.Modal.getInstance(myModal);
    modalInstance.hide();
    // if there is no tasks in localStorage create a new task array
    
// add task to js array
// update local storage
// update display
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    event.preventDefault();

    // Assuming taskId is a string, and the task IDs in taskList are also strings.
    const taskId = $(event.target).attr('data-card-id');

    // Initialize an index to -1 outside of forEach to track if a task to be deleted is found
    let indexToDelete = -1;

    // Iterate over the taskList to find the task to delete
    taskList.forEach((task, index) => {
        if (task.id === taskId) {
            indexToDelete = index; // Set the index if the task is found
        }
    });

    // If a task was found (indexToDelete is not -1), remove it from the array
    if (indexToDelete !== -1) {
        taskList.splice(indexToDelete, 1);
    }

    // Re-render the task list
    renderTaskList();
}
// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList(taskList)
});
$(document).on('click', '.delete', handleDeleteTask);
