let newTaskInput = document.getElementById("new-task");
let addButton = document.getElementById("add-task");
let incompleteTaskHolder = document.getElementById("incomplete-tasks");
let completedTasksHolder = document.getElementById("completed-tasks");

// New task list item
let createNewTaskElement = (taskValue) => {

    let listItem = document.createElement("li");
    listItem.classList.add("task");

    let taskInner = document.createElement("label");
    taskInner.classList.add("task__inner");
    
    let checkBox = document.createElement("input");
    checkBox.classList.add("input-checkbox");
    checkBox.type="checkbox";
    
    let taskInput = document.createElement("input");
    taskInput.classList.add("input");
    taskInput.value = taskValue;
    taskInput.type="text";
    taskInput.disabled;
    
    let editButton = document.createElement("button");
    editButton.classList.add("edit-task-button");
    editButton.classList.add("button");
    editButton.innerText="Edit";
    
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task-button");
    deleteButton.classList.add("button");

    let deleteButtonImg = document.createElement("img");
    deleteButtonImg.classList.add("button__img");
    deleteButtonImg.src='./remove.svg';

    deleteButton.appendChild(deleteButtonImg);

    taskInner.appendChild(checkBox);
    taskInner.appendChild(taskInput);
    listItem.appendChild(taskInner);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

let addTask = () => {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!newTaskInput.value) return;
    let listItem = createNewTaskElement(newTaskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    newTaskInput.value="";
}
let editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    let listItem = this.parentNode;
    let editBtn = listItem.querySelector(".edit-task-button");
    let containsClass = listItem.classList.contains("task_editable");
    
    if(containsClass){
        editBtn.innerText = "Edit";
    }else{
        editBtn.innerText = "Save";
    }
    listItem.classList.toggle("task_editable");
};
let deleteTask = function() {
    console.log("Delete Task...");

    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    
    ul.removeChild(listItem);
}
let taskCompleted = function() {
    console.log("Complete Task...");

    let listItem = this.parentNode.parentNode;
    listItem.classList.add("task_completed");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}
let taskIncomplete = function() {
    console.log("Incomplete Task...");

    let listItem = this.parentNode.parentNode;
    listItem.classList.remove("task_completed");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}
let ajaxRequest = function() {
    console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

let bindTaskEvents = (taskListItem,checkBoxEventHandler) => {
    console.log("bind list item events");
    //select ListItems children
    let checkBox = taskListItem.querySelector(".input-checkbox");
    let editButton = taskListItem.querySelector(".edit-task-button");
    let deleteButton = taskListItem.querySelector(".delete-task-button");

    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}
for (let i=0; i< incompleteTaskHolder.children.length; i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}
for (let i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}