document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";
        
        // Add visual feedback when task is removed
        removeButton.onclick = function() {
            listItem.classList.add('removing');
            setTimeout(() => {
                taskList.removeChild(listItem);
            }, 300); // Match this with CSS transition duration
        };
        
        listItem.appendChild(removeButton);
        
        // Add visual feedback when task is added
        listItem.classList.add('adding');
        taskList.appendChild(listItem);
        
        setTimeout(() => {
            listItem.classList.remove('adding');
        }, 300); // Match this with CSS transition duration
        
        taskInput.value = "";
    }

    addButton.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});