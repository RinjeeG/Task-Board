// Retrieve tasks and nextId from localStorage
// added || [], to add an empty arry if tasks are not found
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("taskId"));


// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timeStamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `${timeStamp}-${random}`;

}

// Todo: create a function to create a task card
function createTaskCard(taskList) {
    const taskCard = $('<div>').addClass('card task-card draggable my-3').attr('data-task-id', taskList.taskId);
    const cardHeader = $('<div>').addClass('card-header h3').text(taskList.taskTitle);
    const cardBody = $('<div>').addClass('card-body');
    const cardDueDate = $('<div>').addClass('card-due-date h3').text(taskList.taskDueDate);
    const cardDescription = $('<p>').addClass('card-description').text(taskList.taskDescription);

    const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-card-id', taskList.taskId);
    cardDeleteBtn.on('click', handleDeleteTask);
      // ? Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
    if (taskList.taskDueDate && taskList.status !== 'done-cards') {
        const now = dayjs();
        const cardDueDate = dayjs(taskList.taskDueDate, 'DD/MM/YYYY');

        // ? If the task is due today, make the card yellow. If it is overdue, make it red.
        if (now.isSame(cardDueDate, 'day')) {
        taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(cardDueDate)) {
        taskCard.addClass('bg-danger text-white');
        cardDeleteBtn.addClass('border-light');
        }
    }


    cardBody.append(cardDueDate,cardDescription,cardDeleteBtn);

    taskCard.append(cardHeader, cardBody);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    const toDoCards = $('#todo-cards');
    toDoCards.empty();
    const progressCards = $('#in-progress-cards');
    progressCards.empty();
    const doneCards = $('#done-cards');
    doneCards.empty();

    for (let tasks of taskList) {
        if (tasks.status === 'todo-cards'){
            toDoCards.append(createTaskCard(tasks));
        } else if (tasks.status === 'in-progress-cards'){
            progressCards.append(createTaskCard(tasks));
        } else if (tasks.status === 'done-cards'){
            doneCards.append(createTaskCard(tasks));
        }
    }
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (e) {
          // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
          const original = $(e.target).hasClass('ui-draggable')
            ? $(e.target)
            : $(e.target).closest('.ui-draggable');
          // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
          return original.clone().css({
            width: original.outerWidth(),
          });
        },
      });
}    

document.addEventListener('DOMContentLoaded', function() {
    // Ensure the modal element exists before attaching the event listener
    var myModal = document.getElementById('formModal');
    myModal.addEventListener('shown.bs.modal', function () {
        // This ensures the modal is fully shown and the DOM within is accessible
        var form = document.getElementById('addTaskForm');
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
        taskDescription: document.getElementById('taskDescription').value,
        status: 'todo-cards',
    };

    console.log(newTasks);

    taskList.push(newTasks);

    localStorage.setItem('tasks', JSON.stringify(taskList));
    alert('Task list saved');

    // close modalk after adding task
    const myModal = document.getElementById('formModal');
    const modalInstance = bootstrap.Modal.getInstance(myModal);
    modalInstance.hide();
    renderTaskList();
    // if there is no tasks in localStorage create a new task array
    
// add task to js array
// update local storage
// update display
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    event.preventDefault();

    // Fetch the task ID from the clicked button's data attribute
    const taskIdEl = $(this).attr('data-card-id');
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Filter out the task to be deleted
    const updatedTasks = tasks.filter(task => task.taskId !== taskIdEl);

    // Update localStorage with the filtered task list
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    renderTaskList(); // Re-render the task list
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
      // ? Read projects from localStorage
  const tasks = taskList;

  // ? Get the project id from the event
  const statusId = ui.draggable[0].dataset.status;

  // ? Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  for (let task of taskList) {
    // ? Find the project card by the `id` and update the project status.
    if (task.status === statusId) {
      task.status = newStatus;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();
}


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList(taskList)
    $('#taskDueDate').datepicker({
        changeMonth: true,
        changeYear: true,
    });
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
});



$(document).on('click', '.delete', handleDeleteTask);