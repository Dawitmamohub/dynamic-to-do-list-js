document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Initialize 
    let tasks = [];

    // Load tasks from Local Storage when page loads
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(taskText => {
                createTaskElement(taskText, false);
            });
        }
    }

    // Create task element (separated from addTask for reuse)
    function createTaskElement(taskText, saveToStorage = true) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";
        
        removeButton.addEventListener('click', function() {
            // Remove from DOM
            taskList.removeChild(listItem);
            
            // Remove from tasks array
            const taskIndex = tasks.indexOf(taskText);
            if (taskIndex > -1) {
                tasks.splice(taskIndex, 1);
                updateLocalStorage();
            }
        });
        
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        
        // Add to tasks array and update storage if needed
        if (saveToStorage) {
            tasks.push(taskText);
            updateLocalStorage();
        }
    }

    // Update Local Storage with current tasks
    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Main add task function
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        createTaskElement(taskText);
        taskInput.value = "";
    }

    // Event listeners
    addButton.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks when page loads
    loadTasks();
});