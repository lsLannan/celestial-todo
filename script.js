// declarations 
const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("addUpdate");

// declare local storage object
let todo = JSON.parse(localStorage.getItem("todo-list"));

if (!todo) {
    todo = [];
}

// CRUD Functions

// Create function 
function createToDoItem() {
    // check if user has entered task
    if (todoValue.value === "") {
        todoAlert.innerText = "Please enter task!";
        todoValue.focus();
        // add task to list n storage
        // check not duplicate task
        // notify of success 
    } else {
        let isPresent = false;

        todo.forEach(element => {
            if (element.item == todoValue.value) {
                isPresent = true;
            }
        });

        if (isPresent) {
            setAlertMessage("This task is already in the list!");
            //alert("This task is already in the list!");
            return;
        }

        let li = document.createElement("li");

        const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
                        <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="images/pencil.png" alt="pencil"/>
                        <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="images/delete.png" /></div></div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);

        if (!todo) {
            todo = [];
        }
        let itemList = { item: todoValue.value, status: false };
        todo.push(itemList);
        setLocalStorage();

        todoValue.value = "";
        setAlertMessage("Task created!");
        //alert("Task Created!");
    }
}

// read function 
// read data from local storage, show in todo list 

function ReadToDoItems() {
    todo.forEach((element) => {
        let li = document.createElement("li");
        let style = "";

        if (element.status) {
            style = "style='text-decoration: line-through'";
        }
        const todoItems = `<div ${style} title="Double click to cross off!" ondblclick="CompletedToDoItems(this)">${
            element.item
        }
        ${
            style === "" 
            ? "" 
            : '<img class="todo-controls" src="images/check-mark.png" />'
        }</div><div>
        ${
            style === "" 
            ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="images/pencil.png" />'
            : ""
        }
        <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="images/delete.png" /></div></div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);
    });
}
ReadToDoItems();

// update function 
function UpdateToDoItems(e) {
    if (e.parentElement.parentElement.querySelector("div").style.text.textDecoration === "") {
        todoValue.value = e.parentElement.parentElement.querySelector("div").innerText;
        updateText = e.parentElement.parentElement.querySelector("div");
        addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
        addUpdate.setAttribute("src", "images/refresh.png");
        todoValue.focus();
    }
}

function UpdateOnSelectionItems() {
    let isPresent = false;

    todo.forEach((element) => {
        if (element.item == todoValue.value) {
            isPresent = true;
        }
    });

    if (isPresent) {
        setAlertMessage("Task is already in list!");
        return;
    }

    todo.forEach((element) => {
        if (element.item == updateText.innerText.trim()) {
            element.item = todoValue.value;
        }
    });
    setLocalStorage();

    updateText.innerText = todoValue.value;
    addUpdate.setAttribute("onclick", "CreateToDoItems()");
    addUpdate.setAttribute("src", "images/plus-sign.png");
    todoValue.value = "";
    setAlertMessage("Todo task updated!");
}

// delete tasks
function DeleteToDoItems(e) {
    let deleteValue = e.parentElement.parentElement.querySelector("div").innerText;

    if (confirm(`Are you sure you want to delete ${deleteValue}?`)) {
        e.parentElement.parentElement.setAttribute("class", "deleted-item");
        todoValue.focus();

        todo.forEach((element) => {
            if (element.item == deleteValue.trim()) {
                todo.splice(element, 1);
            }
        });

        setTimeout(() => {
            e.parentElement.parentElement.remove();
        }, 1000);

        setLocalStorage();
    }
}

// completed, changes status of tasks once completed
function CompletedToDoItems(e) {
    if (e.parentElement.querySelector("div").style.textDecoration === "") {
        const img = document.createElement(img);
        img.src = "images/check-mark.png"
        img.className = "todo-controls";

        e.parentElement.querySelector("div").style.textDecoration = "line-through";
        e.parentElement.querySelector("div").appendChild(img);
        e.parentElement.querySelector("img.edit").remove();

        todo.forEach((element) => {
            if (e.parentElement.querySelector("div").innerText.trim() == element.item) {
                element.status = true;
            }
        });
        setLocalStorage();
        setAlertMessage("Todo task completed!");
    }
}


// set local storage
function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
}

// alert message function
function setAlertMessage(message) {
    todoAlert.removeAttribute("class");
    todoAlert.innerText = message;
    setTimeout(() => {
        todoAlert.classList.add("toggleMe");
    }, 1000);
}