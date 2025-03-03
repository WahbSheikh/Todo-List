function showMessage(msg) {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = msg;
  messageDiv.classList.add("show");
  setTimeout(() => {
    messageDiv.classList.remove("show");
  }, 2000);
}

function toggleMode() {
  document.body.classList.toggle("light-mode");
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    const taskText = li.querySelector("span").textContent;
    const isChecked = li.querySelector("input").checked;
    tasks.push({ text: taskText, checked: isChecked });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear existing tasks before loading
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTask(task.text, task.checked, false);
  });
}

function addTask(
  taskText = null,
  isChecked = false,
  showMessageFlag = true
) {
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  const text = taskText || taskInput.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isChecked;

  checkbox.onchange = () => {
    if (checkbox.checked) {
      showMessage("Task done!");
      celebrate();
    }
    saveTasks();
  };

  const span = document.createElement("span");
  span.textContent = text;
  if (isChecked) {
    span.style.textDecoration = "line-through";
    span.style.opacity = "0.6";
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = function () {
    taskList.removeChild(li);
    showMessage("Task deleted!");
    saveTasks();
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  if (taskText === null) taskInput.value = "";

  if (showMessageFlag) {
    showMessage("Task saved!");
    saveTasks();
  }
}

function celebrate() {
  //only show the celebration message if all tasks are checked
  const allTasks = document.querySelectorAll("#task-list li");
  const allTasksChecked = Array.from(allTasks).every(
    (li) => li.querySelector("input").checked
  );
  if (allTasksChecked) {
    const celebration = document.getElementById("celebration");
    celebration.style.display = "flex";
    setTimeout(() => {
      celebration.style.display = "none";
    }, 2000);
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    addTask();
  }
}