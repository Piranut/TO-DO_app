//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivity so the user can manage daily tasks.

// Select html elements and assign to variables
var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; // first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks");  // #incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); // #completed-tasks

//New Task List Item
function createNewTaskElement(taskString) {

    //Create List Item
    var listItem = document.createElement("li");
    //input (checkbox)
    var checkBox = document.createElement("input"); //checkbox
    //label
    var label = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input"); //text
    //button.edit
    var editButton  = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");

    //Each element, needs modifiying  since checkBox and editInput creates the same input tag and same goes with editButton and deleteButton
    checkBox.type  = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;    // input what ever string the user types in the add field


    //Each element needs appended
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}



//Add a new task
function addTask()  {
    console.log("Add tasks...");
    //Create a new list item with text from #new-task
    var listItem = createNewTaskElement(taskInput.value);    // string that the user types in the input field

    //Append listItem to incompleteTaskHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);   // when the checkbox is checked again, call the taskCompleted method to move the list into the completedTasksHolder

    taskInput.value = "";
    }

// Edit an existing task
function editTask() {
    console.log("Edit tasks...");

    var listItem = this.parentNode;   // listItem is the li (parent of the editButton)

    var editInput = listItem.querySelector("input[type=text]");
    var label  = listItem.querySelector("label");

    var containsClass = listItem.classList.contains("editMode");
        //if the class of the parent is .editMode
        if(containsClass){
            //Switch from .editMode
            //label text gets the input's value
            label.innerText = editInput.value;
        } else {
            //switch to .editMode
            //input value gets the label's text
            editInput.value = label.innerText;
        }
        //toggle .editMode on the listItem
        listItem.classList.toggle("editMode");
}



// Delete an existing task
function deleteTask() {
    console.log("Delete task...");
    var listItem = this.parentNode;    // parentNode of deleteButton is li
    var ul = listItem.parentNode;
    // remove the parent list item from the ul
    ul.removeChild(listItem);
}


// Mark a task as complete
function taskCompleted() {
    console.log("task complete...");
        //Append the task list item to #completed-tasks
        var listItem = this.parentNode;     //parentNode of checkbox is li
        completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);   // when the checkbox is checked again, move the list item into the incompleteTasksHolder
        }


// Mark a task as incomplete
function taskIncomplete() {
    console.log("task incomplete...");
        //Append the task list item to the #incompleted-tasks
        var listItem = this.parentNode;          // parentNode of checkbox is li
        incompleteTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);   // when the checkbox is checked again, move the list item into the completedTasksHolder
        }


function bindTaskEvents(taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");
     //select taskListItem children
     var checkBox = taskListItem.querySelector("input[type=checkbox]") ;
     var editButton = taskListItem.querySelector("button.edit");     // button with class edit
     var deleteButton = taskListItem.querySelector("button.delete"); // button with class delete

      //bind editTask to edit button
      editButton.onclick = editTask;
      //bind deleteTask to delete button
      deleteButton.onclick = deleteTask;
      //bind checkBoxEventHandler (taskCompleted & taskIncomplete) to checkbox
      checkBox.onchange = checkBoxEventHandler;
}

// Set the click handler to the addTask function
addButton.addEventListener("click",addTask);


//Cycle because there are more than one list items in the ul
//cycle over incompleteTasksHolder ul list items
for (var i = 0 ; i < incompleteTasksHolder.children.length ; i++) {
        //bind events to list item's children (call taskCompleted method when checkBox is clicked )
        bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completeTasksHolder ul list items
for (var i=0; i < completedTasksHolder.children.length ; i++) {
      //bind events to list item's children (call taskIncomplete method when checkBox is clicked )
        bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

