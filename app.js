const body = document.body;
const taskList = document.querySelector(".task-list");
const addTaskBtn = document.getElementById("new-task-submit");
const taskInput = document.getElementById("new-task-input");

window.addEventListener("DOMContentLoaded", () => {
    const tasks = localStorage.getItem("tasks");
    const taskArray =  JSON.parse(tasks);

    taskArray.forEach((task) => {
        createTask(task);
    });
})

addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createTask(taskInput.value);
    saveData();
});

const createTask = (taskData) => {
    const tasks = document.createElement("div");
    tasks.id = "tasks";

    const task = document.createElement("div");
    task.className = "task";

    const content = document.createElement("div");
    content.className = "content";
    
    const input = document.createElement("input");
    input.type = "text";
    input.className = "text";
    input.value = taskData;
    input.readOnly = true;

    const actions = document.createElement("div");
    actions.className = "actions";
    
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.className = "done"

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";

    tasks.appendChild(task);
    task.append(content, actions);
    content.appendChild(input);
    actions.append(editBtn, doneBtn, deleteBtn);

    if (taskData === "") {
        alert("You have to input a task before adding");
    } else {
        taskList.appendChild(tasks);
        taskInput.value = "";
    }

    editBtn.addEventListener("click", () =>{
        if (editBtn.textContent === "Edit") {
            input.readOnly = false;
            editBtn.textContent = "Save";
        } else {
            if (input.value === "") {
                alert("Task cannot be empty");
                input.readOnly = false;
                editBtn.textContent = "Save";
            } else {
                input.readOnly = true;
                editBtn.textContent = "Edit"; 
                saveData();
            }
        }
    });

    doneBtn.addEventListener("click", () => {
        if (doneBtn.textContent === "Done") {
            input.classList.add("strike");
            doneBtn.textContent = "Undone";
        } else {
            input.classList.remove("strike");
            doneBtn.textContent = "Done";
        }
    })

    deleteBtn.addEventListener("click", () => {
        tasks.removeChild(task);
        saveData();
    });
}

const saveData = () => {
    const tasks = document.querySelectorAll(".task");
    const taskArray = [];

    tasks.forEach((task) => {
        const input = task.querySelector("input");
        taskArray.push(input.value);
    });

    const taskString = JSON.stringify(taskArray);
    localStorage.setItem("tasks", taskString);
}


// const editBtn = document.querySelector(".edit");


