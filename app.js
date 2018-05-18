// Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListerners();

function loadEventListerners(e) {
    // on DOM load
    document.addEventListener("DOMContentLoaded", getTasks);
    // add task event
    form.addEventListener("submit", addTask);
    // reomve task event
    taskList.addEventListener("click", removeTask);
    // clear list items
    clearBtn.addEventListener("click", clearTasks);
    // filter tasks
    filter.addEventListener("keyup", filterTasks);
};

// get tasks from local storage
function getTasks() {
    let lsTasks;
    if (localStorage.getItem('tasks') === null) {
        lsTasks = [];
    } else {
        lsTasks = JSON.parse(localStorage.getItem('tasks'));
    }

    lsTasks.forEach(task => {
            // create li element
    const li = document.createElement("li");
    
    // add class
    li.className = "collection-item";
    
    // create text node and append to li
    li.appendChild(document.createTextNode(task));

    // create link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";

    // add icon html element
    link.innerHTML = '<i class="fa fa-remove">x</i>';

    // append link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
    });

}

// add task
function addTask(e) {
    if (taskInput.value === "") {
        alert(
            "add a task"
        );
    }

    // create li element
    const li = document.createElement("li");
    
    // add class
    li.className = "collection-item";
    
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";

    // add icon html element
    link.innerHTML = '<i class="fa fa-remove">x</i>';

    // append link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    // store in local storage
    storeTaskInLocalStorage(taskInput.value);
    // clear input
    taskInput.value = "";    

    e.preventDefault();
}

// remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if(confirm("are you sure?"))
            e.target.parentElement.parentElement.remove()
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
    e.preventDefault();
}

// clear tsks
function clearTasks(e) {
    //taskList.innerHTML = "";
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
    // clear tasks from local storage
    clearTasksFromLocalStorage();
    e.preventDefault();
}

// filter task items
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(task => {
        const item = task.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
         }
    });

}

// store task into local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
    let lsTasks;
    if (localStorage.getItem('tasks') === null) {
        lsTasks = [];
    } else {
        lsTasks = JSON.parse(localStorage.getItem('tasks'));
    }

    lsTasks.forEach((task, index) => {
        let taskDisplay = taskItem.textContent;
        if (task === taskDisplay.substring(0, taskDisplay.length - 1)) {
            lsTasks.splice(index, 1);
        }
    });
    
    localStorage.setItem('tasks', JSON.stringify(lsTasks));
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}