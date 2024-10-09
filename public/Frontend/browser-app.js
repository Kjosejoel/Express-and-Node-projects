// Initialize date picker
const datePicker = flatpickr("#calendar-icon", {
  dateFormat: "d/m/Y",
  allowInput: true,
  onChange: function(selectedDates, dateStr) {
    console.log(`Selected Date: ${dateStr}`);
  }
});

// Open date picker on icon click
document.getElementById('calendar-icon').addEventListener('click', function() {
  datePicker.open();
});


function toggleIcons() {
  const taskInput = document.getElementById('task-name');
  const calendarIcon = document.getElementById('calendar-icon');
  const importantIcon = document.getElementById('mimportant-icon');
  
  if (taskInput.value.trim() !== '') {
      // If there is text, show the icons
      calendarIcon.style.display = 'block';
      importantIcon.style.display = 'block';
  } else {
      // If input is empty, hide the icons
      calendarIcon.style.display = 'none';
      importantIcon.style.display = 'none';
  }
}

// Perform search based on input value
function performSearch() {
  const searchValue = document.getElementById('search-bar').value.toLowerCase();
  
  axios.get('/api/v1/tasks')
    .then(response => {
      console.log("Tasks fetched successfully:", response.data);
      displayFilteredTiles(response.data.tasks, searchValue);
    })
    .catch(error => {
      console.error("Error fetching tasks:", error);
    });
}

// Fetch tasks and display them
async function fetchData() {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/tasks');
    console.log('Fetched Data:', response.data);
    displayTiles(response.data.tasks);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Display all tasks as tiles
function displayTiles(tasks) {
  const container = document.getElementById('tiles-container');
  container.innerHTML = ''; // Clear existing tiles

  tasks.forEach(({ name, completed, date, _id }) => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    
    const formattedDate = date ? new Date(date).toLocaleDateString('en-GB') : 'NA';
    const iconSrc = completed ? "../svgs/tick-checkbox.svg" : "../svgs/circle.svg";
    const taskClass = completed ? "completed-task" : "";

    tile.innerHTML = `
      <span><img src="${iconSrc}" alt="toggle completion" onclick="toggleCompleted(this, '${_id}', ${completed})"></span>
      <span class="task-name ${taskClass}"><strong>Name:</strong> ${name}</span>
      <div class="task-date ${taskClass}"><strong>Date:</strong> ${formattedDate}</div> <!-- Updated with task-date class -->
      <img src="../svgs/delete.svg" class="delete-icon" alt="Delete Task" onclick="deleteTask('${_id}', this)">
    `;
    
    container.appendChild(tile);
  });
}

// Display filtered tiles based on search input
function displayFilteredTiles(tasks, searchValue) {
  const container = document.getElementById('tiles-container');
  container.innerHTML = ''; // Clear existing tiles

  const filteredTasks = tasks.filter(task => 
    task.name.toLowerCase().includes(searchValue) || 
    task._id.toLowerCase().includes(searchValue)
  );

  filteredTasks.forEach(({ name, completed, date, _id }) => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    
    const formattedDate = date ? new Date(date).toLocaleDateString('en-GB') : 'NA';
    const iconSrc = completed ? "../svgs/tick-checkbox.svg" : "../svgs/circle.svg";
    const taskClass = completed ? "completed-task" : "";

    tile.innerHTML = `
      <span><img src="${iconSrc}" alt="toggle completion" onclick="toggleCompleted(this, '${_id}', ${completed})"></span>
      <span class="task-name ${taskClass}"><strong>Name:</strong> ${name}</span>
      <div class="task-date ${taskClass}"><strong>Date:</strong> ${formattedDate}</div> <!-- Updated with task-date class -->
      <img src="../svgs/delete.svg" class="delete-icon" alt="Delete Task" onclick="deleteTask('${_id}', this)">
    `;
    
    container.appendChild(tile);
  });
}


// Toggle task completion and update the status in the backend
async function toggleCompleted(element, taskId, isCompleted) {
  const newCompletedStatus = !isCompleted; // Toggle the completion status

  try {
    // Send a PATCH request to update the task's completed status
    const response = await axios.patch(`/api/v1/tasks/${taskId}`, {
      completed: newCompletedStatus
    });
    
    console.log('Task completion updated:', response.data);

    // Update the icon and strikethrough in the UI
    const iconSrc = newCompletedStatus ? "../svgs/tick-checkbox.svg" : "../svgs/circle.svg";
    element.src = iconSrc;
    const tile = element.closest('.tile');
    tile.querySelector('.task-name').classList.toggle('completed-task', newCompletedStatus);
    tile.querySelector('.task-date').classList.toggle('completed-task', newCompletedStatus); // New line for date strikethrough
  } catch (error) {
    console.error("Error updating task completion status:", error);
  }
}

// Add a new task
document.getElementById('plus').addEventListener('click', async function(event) {
  event.preventDefault();

  const taskName = document.getElementById('task-name').value.trim();
  const selectedDate = datePicker.selectedDates[0];
  const important = document.getElementById('mimportant-icon').classList.contains('active');
  
  if (!taskName) {
    alert("Please enter a task name.");
    return;
  }

  // If no date is selected, set it to today's date
  const taskDate = selectedDate ? selectedDate : new Date();
  const formattedDate = formatDateToISO(taskDate);

  const taskData = {
    name: taskName,
    date: formattedDate,
    important: important
  };

  try {
    const response = await axios.post('http://localhost:3000/api/v1/tasks', taskData);
    console.log('Task added successfully:', response.data);
    
    fetchData(); // Refresh the task list
    document.getElementById('task-name').value = ''; // Clear the task name field
    document.getElementById('mimportant-icon').classList.remove('active'); // Reset important icon
    datePicker.clear(); // Clear the date picker
  } catch (error) {
    console.error('Error adding task:', error);
  }
});

// Format date to ISO string
function formatDateToISO(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Toggle important status when icon is clicked
document.getElementById('mimportant-icon').addEventListener('click', function() {
  this.classList.toggle('active');
});

async function deleteTask(taskId, deleteIcon) {
  try {
    // Send DELETE request to remove the task
    const response = await axios.delete(`/api/v1/tasks/${taskId}`);
    console.log('Task deleted:', response.data);

    // Remove the task's tile from the DOM
    const tile = deleteIcon.closest('.tile');
    tile.remove();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

async function fetchImportantTasks() {
  try {
    const response = await axios.get('api/v1/tasks/filter?important=true');
    console.log('Fetched Important Tasks:', response.data);

    // Check if tasks are found
    if (response.data.tasks.length > 0) {
      displayTiles(response.data.tasks);
    } else {
      // If no important tasks found, display a blank screen or a message
      console.log('No important tasks found.');
      displayTiles([]); // Clear existing tiles
    }
  } catch (error) {
    console.error('Error fetching important tasks:', error);
  }
}

async function fetchPlannedTasks() {
  try {
    // Call the backend to get all planned (future) tasks
    const response = await axios.get('api/v1/tasks/planned');
    console.log('Fetched Planned Tasks:', response.data);

    if (response.data.tasks.length > 0) {
      displayTiles(response.data.tasks);
    } else {
      console.log('No planned tasks found.');
      displayTiles([]); // Clear tiles if no tasks found
    }
  } catch (error) {
    console.log('No planned tasks found.');
    displayTiles([]);
    console.error('Error fetching planned tasks:', error);
  }
}