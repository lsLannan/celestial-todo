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
    }
}