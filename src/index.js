'use strict';
console.log('uzomian...');

// Imports
import {html as inbox} from './inbox.js';
import {html as today} from './today.js';
import {html as thisWeek} from './this-week.js';
import {html as taskForm} from './task-form.js';
import {html as newTask} from './new-task.js';

/////////////////////////////////////////////////////////////////////
// Functions
function init() {
    const display = document.querySelector('.display');
    display.insertAdjacentHTML('afterbegin', inbox);

    // Set event on the 'form' to add new tasks
    setForm();

    return display;
}

function setForm() {
    form = document.querySelector('.add-task');
    form.addEventListener('click', showForm);
}


// Event Handlers
function displayTab(e) {
    const tab = e.target.closest('li');

    // Show active nav link
    tabs.forEach(t => t.classList[t == tab ? 'add' : 'remove']('active'));

    // Display tab
    display.innerHTML = '';
    display.insertAdjacentHTML('afterbegin', eval(tab.id));

    if (tab.id == 'inbox') setForm();
}

function showForm(e) {
    e.target.closest('p').classList.add('hidden');
    display.insertAdjacentHTML('beforeend', taskForm);

    const addBtn = document.querySelector('.add');
    const cancelBtn = document.querySelector('.cancel');

    addBtn.addEventListener('click', addTask);
    cancelBtn.addEventListener('click', hideForm);

    // Add task with 'Enter' key
    document.addEventListener('keydown', altAddTask);
}

function hideForm() {
    document.querySelector('.inbox p').classList.remove('hidden');
    document.querySelector('.form').remove();

    // Remove this event whenever the form is not displayed
    document.removeEventListener('keydown', altAddTask);
}

function addTask() {
    const taskNameVal = document.querySelector('.form input').value;

    if (!taskNameVal) {
        alert('Your task name cannot be empty');
        return;
    }

    // Hide the form input
    hideForm();

    // Add new task
    document.querySelector('.inbox p').insertAdjacentHTML('beforebegin', newTask);  

    // Set the task name to equal the value typed in the form input
    const taskName = document.querySelector('.task-name');
    taskName.innerHTML = taskNameVal;

    // Change task name
    const nameInput = document.querySelector('.name-inp');
    
    taskName.addEventListener('click', showTaskNameInput.bind(taskName, nameInput));
    nameInput.addEventListener('change', setNewTaskName.bind(nameInput, taskName));

    // Set the date 
    const dateVal = document.querySelector('.date-val');
    const dateInput = document.querySelector('#task-date');

    dateInput.addEventListener('change', setDate.bind(dateInput, dateVal));
    dateVal.addEventListener('click', showDatePicker.bind(dateVal, dateInput));

    // Cancel the task when checkbox is clicked
    const taskCheckbox = document.querySelector('.task-checkbox');
    taskCheckbox.addEventListener('click', toggleTaskCancel);

    // Remove task
    document.querySelector('.remove-task').addEventListener('click', removeTask);

}

function altAddTask(e) {
    if (e.key == 'Enter') addTask();
    return;
}

function showTaskNameInput(elem) {
    // Hide the task name and display name input
    elem.classList.remove('hidden');
    this.classList.add('hidden');
}

function setNewTaskName(elem) {
    const newTaskName = this.value;

    // Hide the name input and display the task name
    elem.classList.remove('hidden');
    this.classList.add('hidden');

    elem.innerHTML = newTaskName;
}

function setDate(elem) {
    const date = this.value;

    // Hide the input and display its value
    elem.classList.remove('hidden');
    this.classList.add('hidden');

    elem.innerHTML = date;
}

function showDatePicker(elem) {
    // Hide the date and display date picker
    elem.classList.remove('hidden');
    this.classList.add('hidden');

    // Reset the date picker
    elem.value = '';
}

function toggleTaskCancel() {
    if (taskCancelCounter % 2) {
        // Hide the span.task-checkbox--full
        document.querySelector('.task-checkbox--full').classList.add('hidden');

        // Ungray the new-task div and display the date input if date-val is hidden
        document.querySelector('.new-task').classList.remove('new-task--cancel');
        if ([...document.querySelector('.date-val').classList].includes('hidden')) document.querySelector('#task-date').classList.remove('hidden');
    }
    else {
        // Display the span.task-checkbox--full
        document.querySelector('.task-checkbox--full').classList.remove('hidden');
    
        // Gray out the new-task div and hide the date input
        document.querySelector('.new-task').classList.add('new-task--cancel');
        document.querySelector('#task-date').classList.add('hidden');
    }

    taskCancelCounter++;
}

function removeTask() {
    document.querySelector('.new-task').remove();
}


/////////////////////////////////////////////////////////////////////
// DOM
let form;
const display = init();
const tabs = document.querySelectorAll('.nav-lis li');

// Var
let taskCancelCounter = 0;


// Event Listeners
tabs.forEach(tab => tab.addEventListener('click', displayTab));


