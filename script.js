document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let tasks = [];

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(taskText => {
                createTaskElement(taskText, false);
            });
        }
    }

    // Create task element with visual feedback
    function createTaskElement(taskText, saveToStorage = true) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";
        
        removeButton.addEventListener('click', function() {
            // Add visual feedback before removal
            listItem.classList.add('removing');
            
            setTimeout(() => {
                taskList.removeChild(listItem);
                const taskIndex = tasks.indexOf(taskText);
                if (taskIndex > -1) {
                    tasks.splice(taskIndex, 1);
                    updateLocalStorage();
                }
            }, 300); // Match with CSS transition duration
        });
        
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        
        // Add visual feedback for new task
        listItem.classList.add('adding');
        setTimeout(() => {
            listItem.classList.remove('adding');
        }, 300);
        
        if (saveToStorage) {
            tasks.push(taskText);
            updateLocalStorage();
        }
    }

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

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

    // Initialize
    loadTasks();
});