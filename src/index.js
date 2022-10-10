'use strict';
console.log('uzomian...');

// Imports
import {html as inbox} from './inbox.js';
import {html as today} from './today.js';
import {html as thisWeek} from './this-week.js';
import {html as taskForm} from './task-form.js';

/////////////////////////////////////////////////////////////////////
// Functions
function init() {
    const display = document.querySelector('.display');
    display.insertAdjacentHTML('afterbegin', inbox);
    return display;
}


// Event Handlers
function displayTab(e) {
    const tab = e.target.closest('li');
    tabs.forEach(t => t.classList[t == tab ? 'add' : 'remove']('active'));

    display.innerHTML = '';
    display.insertAdjacentHTML('afterbegin', eval(tab.id));
}

function showForm(e) {
    e.target.closest('p').classList.add('hidden');
    display.insertAdjacentHTML('beforeend', taskForm);

    const addBtn = document.querySelector('.add');
    const cancelBtn = document.querySelector('.cancel');

    addBtn.addEventListener('click', addTask);
    cancelBtn.addEventListener('click', hideForm);
}

function hideForm(e) {
    document.querySelector('.inbox p').classList.remove('hidden');
    document.querySelector('.form').remove();
}

function addTask(e) {

}

function addEvent(e) {
    console.log(e);
}

/////////////////////////////////////////////////////////////////////
// DOM
const display = init();
const tabs = document.querySelectorAll('.nav-lis li');
const form = document.querySelector('.add-task');


// Event Listeners
tabs.forEach(tab => tab.addEventListener('click', displayTab));
form.addEventListener('click', showForm);

// Remember to solve the problem of the form's event not firing when you change the tab