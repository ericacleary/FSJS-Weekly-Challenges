//Problem: User interaction doesn't provide desired results
//Solution: Add interactivity so that the user can manage daily tasks

var taskInput = document.getElementById('new-task'); //new-task
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); //incomplete-tasks
var completedTasksHolder = document.getElementById('completed-tasks'); //completed-tasks


//New Task List item
var createNewTaskElement = function(taskString){
  //Create List Item
    var listItem = document.createElement('li');
    //input (checkbox)
    var checkBox = document.createElement('input');
    //label
    var label = document.createElement('label');
    //input (text)
    var editInput = document.createElement('input');
    //button.Edit
    var editButton = document.createElement('button');
    //button.Delete
    var deleteButton = document.createElement('button');
    //each element needs modifing
    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;

    //each element needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

  return listItem;
}

//Add a new tasks
var addTask = function() {
  console.log('Add task...');
  //Create a new list item with the text from #new-task:
    var listItem = createNewTaskElement(taskInput.value);
    //Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = '';

}

//Edit existing tasks
var editTask = function() {
  console.log('Edit task...');

  var listItem = this.parentNode;

  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');

  var containsClass = listItem.classList.contains('editMode');
    //if the class of the parent is .editMode
    if(containsClass) {
      //Switch from .editMode
      //label text becomes the input's value
      label.innerText = editInput.value;
    } else {
      //switch to .editMode
      //input value becomes the labels text
      editInput.value = label.innerText;
    }
      //Toggle .editMode on the parent (listItem)
      listItem.classList.toggle('editMode');

}

//Delete an existing task
var deleteTask = function() {
  console.log('Delete task...');
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  //When the delete button is pressed
    //Remove the parent list items from the ul
    ul.removeChild(listItem);
}

//Mark a task as complete
var taskComplete = function() {
  console.log('Task complete...');

  //When the checkbox is checked
    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, )

}

//Mark a task as incomplete
var taskIncomplete = function() {
  console.log('Task incomplete...');
  //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks
}
var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log('bind list item events');
  //select taskListItem's children
  var checkBox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');

  //bind editTask to the edit button
  editButton.onclick = editTask;

  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
  console.log('AJAX request');
}

//Set the click handler to the addTask function
addButton.onclick = addTask;//button is an element
addButton.addEventListener('click', ajaxRequest);

//Cycle over incompleteTasksHolder ul items
for(var i = 0; i < incompleteTasksHolder.children.length; i++){
  //bind events to list items children(taskComplete)
  bindTaskEvents(incompleteTasksHolder.children[i], taskComplete);
}
//Cycle over completeTasksHolder ul items
for(var i = 0; i < completeTasksHolder.children.length; i++){
  //bind events to list items children(taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
