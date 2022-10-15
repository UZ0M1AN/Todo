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
}

function hideForm() {
    document.querySelector('.inbox p').classList.remove('hidden');
    document.querySelector('.form').remove();
}

function addTask() {
    const taskName = document.querySelector('.form input').value;
    hideForm();

    document.querySelector('.inbox p').insertAdjacentHTML('beforebegin', newTask);  

    // Set the task name to equal the value typed in the form input
    document.querySelector('.task-name').innerHTML = taskName;
}


/////////////////////////////////////////////////////////////////////
// DOM
let form;
const display = init();
const tabs = document.querySelectorAll('.nav-lis li');


// Event Listeners
tabs.forEach(tab => tab.addEventListener('click', displayTab));


