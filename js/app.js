// Main Elements
var taskInput = document.getElementById("new-task"); // new-task
var addButton = document.getElementsByTagName("button")[0];  // firstButton
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); // incomplete-task
var completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks

// New Task list item
function createNewTaskElement(taskString) {
    // create list item
    var listItem = document.createElement('li');
    // input (checkbox)
    var checkBox = document.createElement('input');
    // label
    var label = document.createElement('label');
    // input (text)
    var editInput = document.createElement('input');
    // button.edit
    var editButton = document.createElement('button');
    // button.delete
    var deleteButton = document.createElement('button');

    // each element needs modifying
    checkBox.type = ("checkbox");
    editInput.type = ("text");

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;
    // each element needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

// Add a new task
var addTask = function() {
    console.log('add task..');
    // create a new list item with the text from #new-task
    var listItem = createNewTaskElement(taskInput.value);
    // append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
};


// Edit an existing task

var editTask = function() {
    console.log('edit task');

    var listItem = this.parentNode;

    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");

    var containsClass = listItem.classList.contains("editMode");

    // if the class of the parent is .editMode
    if(containsClass) {
        // switch from .editMode
        // label text becomes input's value
        label.innerText = editInput.value;
    } else {
        // switch to .editMode
        // input's value becomes the label's text
        editInput.value = label.innerText;
    }
    // Toggle .editMode on the listItem
    listItem.classList.toggle("editMode");
};

// Delete task
var deleteTask = function() {
    console.log('delete task');
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    // remove the parent listItem from the ul
    ul.removeChild(listItem);
};


// Task completed
var taskCompleted = function() {
    console.log('task complete');
    // append the list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};


// Task incomplete
var taskIncomplete = function() {
    console.log('task incomplete');
    // append the list item to the #incomplete-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log('Bind list item events');

    // select taskListItem's children
    var checkBox = taskListItem.querySelector("input[type=checkBox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    //bind editTask to edit button
    editButton.onclick = editTask;
    // bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    // bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;
};

// set the click handler to the addTask function
addButton.onclick = addTask;

// cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

// cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}


