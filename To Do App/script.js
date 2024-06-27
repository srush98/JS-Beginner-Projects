let tasks = [];

// Add Task Functionality
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const currentDate = new Date().toISOString(); // Get the current date and time
        tasks.push({ text: taskText, dateCreated: currentDate }); // Store task as an object
        displayTasks();
        taskInput.value = '';
    }
    else {
        alert('Please enter a task');
        taskInput.focus();
        return false;
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    // Sort tasks by date
    tasks.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));

    tasks.forEach(function (task, index) {
        const li = document.createElement('li');
        li.textContent = task.text;

        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update';
        updateBtn.className = 'update-btn';
        updateBtn.onclick = function () {
            const updatedTask = prompt('Enter updated task:', task.text)
            if (updatedTask !== null && updatedTask.trim() !== '') {
                tasks[index].text = updatedTask;
                displayTasks();
            }
        }

        // Create a button to delete each element
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function () {
            // ask to confirm deletion
            if (confirm('Are you sure you want to delete this task?')) {
                tasks.splice(index, 1);
                displayTasks();
                return;
            }
        }
        li.appendChild(updateBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}