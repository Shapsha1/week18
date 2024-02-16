const form = document.forms.taskForm;
const taskInput = taskForm.elements.taskInput;
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const cleanBtn = document.getElementById("cleanBtn");
let tasks = [];
document.addEventListener("DOMContentLoaded", function () {
    let oldTasks = JSON.parse(localStorage.getItem("oldTasks"));
    if (oldTasks != null) {
        emptyMessage.classList.add("hidden");
        cleanBtn.removeAttribute("disabled");
        for (let i = 0; i < oldTasks.length; i++) {
            tasks.push(oldTasks[i]);
            let newTaskElement = document.createElement(oldTasks[i].tag);
            newTaskElement.innerHTML = oldTasks[i].innerHTML;
            newTaskElement.classList.add(oldTasks[i].class);
            taskList.append(newTaskElement);
        }
    }
});
form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const taskText = taskInput.value;
    if (!taskText == "") {
        emptyMessage.classList.add("hidden");
        cleanBtn.removeAttribute("disabled");
        const newTask = {
            tag: "label",
            innerHTML:
                taskText +
                '<input type="checkbox" class="list-section__checkbox" /> <span class="list-section__checkmark"></span>',
            class: "list-section__task",
        };
        let newTaskElement = document.createElement(newTask.tag);
        newTaskElement.innerHTML = newTask.innerHTML;
        newTaskElement.classList.add(newTask.class);
        taskList.append(newTaskElement);
        tasks.push(newTask);
        tasksString = JSON.stringify(tasks);
        window.localStorage.setItem("oldTasks", tasksString);
        form.reset();
    }
});
cleanBtn.addEventListener("click", function () {
    tasks = [];
    taskList.innerHTML = "";
    emptyMessage.classList.remove("hidden");
    cleanBtn.setAttribute("disabled", true);
    localStorage.clear();
});
