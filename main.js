let input = document.querySelector("input[type = \"text\"]");
let btn = document.querySelector("input[type = \"button\"]");

// Check Is there String in The Input
function isEmpty () {
    if (input.value === "")
        return true;
    else
        return false;
}

// create Task
btn.onclick = function () {
    
    if (isEmpty()) {
        alertConfirm();
        return;
    }

    // Create Checkbox input
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.setAttribute("onclick", "changeData(this)");

    // Create Label
    let label = document.createElement("label");
    let text = document.createElement("span");
    text.innerHTML = input.value;
    text.className = "task-name";

    // Create iconContainer and Assign their className
    let penIcon = document.createElement("i");
    let trashIcon = document.createElement("i");
    penIcon.className = "fa-solid fa-pen";
    trashIcon.className = "fa-solid fa-trash-can";

    // Set Attribute to Icons 
    trashIcon.setAttribute("onclick", "del(this)");
    penIcon.setAttribute("onclick", "edit(this)");

    // Create Icons Container
    let iconContainer = document.createElement("div");
    iconContainer.className = "icons";

    // Create List Container
    let list = document.createElement("div");
    list.className = "list";

    // Create Date
    let dateContainer = document.createElement("span");
    let dateIcon = document.createElement("i");
    dateIcon.className = "fa-regular fa-clock";
    let date = new Date();
    date = date.toLocaleDateString();
    dateContainer.append(dateIcon);
    dateContainer.append(date);
    dateContainer.className = "date";

    // Append Items To List
    label.append(text);
    list.prepend(label);
    list.prepend(checkBox);
    iconContainer.appendChild(penIcon);
    iconContainer.appendChild(trashIcon);
    list.append(iconContainer);
    label.appendChild(dateContainer);

    // Append List To List-Container
    document.querySelector(".list-container").append(list);

    // Save Data To Local Storage
    localStorage.setItem(text.innerHTML, JSON.stringify({"task": text.innerHTML, "date": date, "isDone": false}));

    //reset value in Input 
    input.value = "";
}

// Delete Task
function del (e) {
    showDeleteConfirm(e);
    let yesBtn = document.querySelector(".confirm .yes");
    yesBtn.onclick = function () {
        let listParent = e.parentNode.parentNode;
        listParent.remove();
        hideDeleteConfirm();
        let text = listParent.querySelector("span.task-name");
        localStorage.removeItem(text.innerHTML);
    }
    let noBtn = document.querySelector(".confirm .no");
    noBtn.onclick = hideDeleteConfirm;
}

// Delete Confirm
function showDeleteConfirm (e) {
    let title = document.querySelector(".confirm .title");
    title.innerHTML = "Delete";

    // Create Message
    let taskName = e.parentNode.parentNode;
    let text = taskName.querySelector("label .task-name");

    let message = document.createElement("p");
    let span = document.createElement("span");
    message.innerHTML = "Do you want to delete";
    span.innerHTML = text.innerHTML;
    message.appendChild(span);
    
    // create Buttons 
    let noBtn = document.createElement("input");
    let yesBtn = document.createElement("input");
    noBtn.type = "button";
    noBtn.className = "no";
    noBtn.value = "No";
    yesBtn.type = "button";
    yesBtn.className = "yes";
    yesBtn.value = "Yes";

    // add to form
    let form = document.createElement("form");
    form.className = "delete";
    form.append(yesBtn);
    form.append(noBtn);
    document.querySelector(".confirm .box").append(message);
    document.querySelector(".confirm .box").append(form);

    showConfirm();
}

// Hide Delete Confirm
function hideDeleteConfirm () {
    hideConfirm();
    let form = document.querySelector(".confirm form");
    form.remove();
    let message = document.querySelector(".confirm p");
    message.remove();
}

// Edit Task 
function edit (e) {
    showEditConfirm();
    let input = document.querySelector(".confirm input[type = \"text\"]");
    let taskName = e.parentNode.parentNode;
    let text = taskName.querySelector("label .task-name");

    // set old task value to input field
    input.value = text.innerHTML;

    // cancel button
    let cancelBtn = document.querySelector(".cancel");
    cancelBtn.onclick = hideEditConfirm;

    // save button
    let saveBtn = document.querySelector(".save");
    saveBtn.onclick = function () {
        let oldTask = JSON.parse(localStorage.getItem(text.innerHTML));
        localStorage.removeItem(text.innerHTML);

        text.innerHTML = input.value;
        hideEditConfirm();

        oldTask.task = text.innerHTML;
        localStorage.setItem(text.innerHTML, JSON.stringify(oldTask));
    }
}

// show Edit Confirm Box 
function showEditConfirm () {
    // add Title
    let title = document.querySelector(".confirm .title");
    title.innerHTML = "Edit";

    // Create Form
    let form = document.createElement("form");

    // create input
    let textInput = document.createElement("input");
    textInput.type = "text";

    // create buttons
    let cancelBtn = document.createElement("input");
    let saveBtn = document.createElement("input");
    cancelBtn.type = "button";
    cancelBtn.className = "cancel";
    cancelBtn.value = "cancel";
    saveBtn.type = "button";
    saveBtn.className = "save";
    saveBtn.value = "save";

    // add inputs to form
    form.append(textInput);
    form.append(saveBtn);
    form.append(cancelBtn);

    // add to page
    document.querySelector(".confirm .box").append(form);

    showConfirm();
}

// hide Edit confirm box 
function hideEditConfirm () {
    hideConfirm();
    let form = document.querySelector(".confirm form");
    form.remove();
}

// Show Confirm
function showConfirm () {
    let confirm = document.querySelector(".confirm");
    confirm.style = "display: block;";
    let box = document.querySelector(".box");
    box.className += " active";
}

// Hide Confirm
function hideConfirm () {
    let confirm = document.querySelector(".confirm");
    confirm.style = "display: none;";
    let box = document.querySelector(".box");
    box.className = "box";
}

// Show alert Confirm 
function alertConfirm () {
    showConfirm();

    let confirm = document.querySelector(".confirm .box");
    // add Title
    let title = document.querySelector(".confirm .title");
    title.innerHTML = "Alert";
    title.style = "color: #f44336";

    // add message
    let message = document.createElement("p");
    message.innerHTML = "You Should Add a Task";
    
    // create button
    let form = document.createElement("form");
    let btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Ok";
    form.className = "form";
    btn.onclick = function () {
        hideConfirm();
        let form = document.querySelector(".confirm form");
        let message = document.querySelector(".confirm p");
        form.remove();
        message.remove();
    }
    form.appendChild(btn);

    // add elements 
    confirm.append(title);
    confirm.append(message);
    confirm.append(form);
}
window.onload = function () {
    let keys = Object.keys(localStorage);
    let values = [];
    for (let i = 0; i < keys.length; i++) {
        values[i] = JSON.parse(localStorage.getItem(keys[i]));
        retrieveData(values[i]);
    }
}

function retrieveData (values) {
    // Create Checkbox input
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.setAttribute("onclick", "changeData(this)");
    checkBox.checked = values.isDone;

    // Create Label
    let label = document.createElement("label");
    let text = document.createElement("span");
    text.innerHTML = values.task;
    text.className = "task-name";

    // Create iconContainer and Assign their className
    let penIcon = document.createElement("i");
    let trashIcon = document.createElement("i");
    penIcon.className = "fa-solid fa-pen";
    trashIcon.className = "fa-solid fa-trash-can";

    // Set Attribute to Icons 
    trashIcon.setAttribute("onclick", "del(this)");
    penIcon.setAttribute("onclick", "edit(this)");

    // Create Icons Container
    let iconContainer = document.createElement("div");
    iconContainer.className = "icons";

    // Create List Container
    let list = document.createElement("div");
    list.className = "list";

    // Create Date
    let dateContainer = document.createElement("span");
    let dateIcon = document.createElement("i");
    dateIcon.className = "fa-regular fa-clock";
    let date = values.date;
    dateContainer.append(dateIcon);
    dateContainer.append(date);
    dateContainer.className = "date";

    // Append Items To List
    label.append(text);
    list.prepend(label);
    list.prepend(checkBox);
    iconContainer.appendChild(penIcon);
    iconContainer.appendChild(trashIcon);
    list.append(iconContainer);
    label.appendChild(dateContainer);

    // Append List To List-Container
    document.querySelector(".list-container").append(list);
}

function changeData (e) {
    let parent = e.parentNode;
    let text = parent.querySelector("span.task-name")
    let task = JSON.parse(localStorage.getItem(text.innerHTML));
    task.isDone = e.checked;
    localStorage.setItem(text.innerHTML, JSON.stringify(task));

}