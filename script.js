// script.js

let tasks = [];
let points = 0;

function scrollToDemo() {
  document.getElementById("demo").scrollIntoView({ behavior: "smooth" });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const type = document.getElementById("taskType").value;
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  if (tasks.length >= 50) {
    alert("Task limit reached. You can only have up to 50 tasks.");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    type: type
  };

  tasks.push(task);
  input.value = "";
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${task.text} <small>(${formatTaskType(task.type)})</small></span>
      <button onclick="completeTask(${task.id})">Complete</button>
    `;

    list.appendChild(li);
  });
}

function completeTask(id) {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  fileInput.onchange = () => {
    const file = fileInput.files[0];

    if (file) {
      points += 10;
      document.getElementById("points").textContent = points;

      tasks = tasks.filter(task => task.id !== id);
      renderTasks();

      alert("Quest complete! Photo verified. +10 points earned.");
    }
  };

  fileInput.click();
}

function formatTaskType(type) {
  if (type === "daily") return "Daily";
  if (type === "everyOther") return "Every Other Day";
  if (type === "weekly") return "Weekly";
  if (type === "special") return "Special";
  return type;
}
