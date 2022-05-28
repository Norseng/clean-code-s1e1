let newTaskInput = document.getElementById("new-task");
let addButton = document.getElementById("add-task");
let incompleteTaskHolder = document.getElementById("incomplete-tasks");
let completedTasksHolder = document.getElementById("completed-tasks");

let createNewTaskElement = (taskValue) => {
    let listItem = document.createElement("li");
    listItem.classList.add("task-list__task");
    
    let checkBox = document.createElement("input");
    checkBox.classList.add("task-list__input-checkbox");
    checkBox.type="checkbox";
    
    let taskInput = document.createElement("input");
    taskInput.classList.add("task-list__input");
    taskInput.value = taskValue;
    taskInput.type="text";
    
    let editButton = document.createElement("button");
    editButton.classList.add("edit-task-button");
    editButton.classList.add("button");
    editButton.innerText="Edit";
    
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task-button");
    deleteButton.classList.add("button");

    let deleteButtonImg = document.createElement("img");
    deleteButtonImg.classList.add("button__img");
    deleteButtonImg.src="./remove.svg";

    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(taskInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}
let addTask = () => {
    if (!newTaskInput.value) return;
    let listItem = createNewTaskElement(newTaskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    newTaskInput.value="";
}
let editTask = function() {
    let listItem = this.parentNode;
    let editBtn = listItem.querySelector(".edit-task-button");
    let containsClass = listItem.classList.contains("task-list__task_editable");
    
    if(containsClass){
        editBtn.innerText = "Edit";
    }else{
        editBtn.innerText = "Save";
    }
    listItem.classList.toggle("task-list__task_editable");
};
let deleteTask = function() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    
    ul.removeChild(listItem);
}
let taskCompleted = function() {
    let listItem = this.parentNode;
    listItem.classList.add("task-list__task_completed");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}
let taskIncomplete = function() {
    let listItem = this.parentNode;
    listItem.classList.remove("task-list__task_completed");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

let bindTaskEvents = (taskListItem,checkBoxEventHandler) => {
    let checkBox = taskListItem.querySelector(".task-list__input-checkbox");
    let editButton = taskListItem.querySelector(".edit-task-button");
    let deleteButton = taskListItem.querySelector(".delete-task-button");
    
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}
for (let i=0; i< incompleteTaskHolder.children.length; i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}
for (let i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}