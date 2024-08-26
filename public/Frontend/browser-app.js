function performSearch() {
  const searchValue = document.getElementById('search-bar').value.toLowerCase();
  axios.get('/api/v1/tasks')
    .then(response => {
      console.log("Tasks fetched successfully:", response.data);
      // Handle the response data and filter based on search value
      displayFilteredTiles(response.data.tasks, searchValue);
    })
    .catch(error => {
      console.error("Error fetching tasks:", error);
    });
}
const datePicker = flatpickr("#calendar-icon", {
  dateFormat: "d/m/Y", // Set date format to dd/mm/yyyy
  allowInput: true, // Allow manual input of the date
  onChange: function(selectedDates, dateStr, instance) {
    console.log(`Selected Date: ${dateStr}`);
  }
});

// Function to open the date picker when the icon is clicked
document.getElementById('calendar-icon').addEventListener('click', function() {
  datePicker.open(); // Open the date picker
});

async function fetchData() {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/tasks'); // Replace with your API URL
    const data = response.data;
    console.log('Fetched Data:', data); // Debugging line
    // Access the "tasks" property from the response
    displayTiles(data.tasks);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayTiles(data) {
  const container = document.getElementById('tiles-container');
  container.innerHTML = ''; // Clear existing tiles

  data.forEach(({ name, completed,date }) => { // Destructure the properties
    const tile = document.createElement('div');
    tile.className = 'tile';
    const formattedDate = date ? new Date(date).toLocaleDateString('en-GB'):'NA';
    // Display only the 'name' and 'completed' properties
    tile.innerHTML = `
        <div><strong>Name:</strong> ${name}</div>
        <div><strong>Completed:</strong> ${completed ? 'Yes' : 'No'}</div>
        <div><strong>Date:</strong> ${formattedDate}</div>
    `;
    container.appendChild(tile);
  });
}
function displayFilteredTiles(tasks, searchValue) {
  const container = document.getElementById('tiles-container');
  container.innerHTML = ''; // Clear existing tiles

  const filteredTasks = tasks.filter(task => 
    task.name.toLowerCase().includes(searchValue) || 
    task._id.toLowerCase().includes(searchValue)
  );

  console.log('Filtered Data to display:', filteredTasks);

  filteredTasks.forEach(item => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    const formattedDate = item.date ? new Date(item.date).toLocaleDateString('en-GB') : 'NA';
    tile.innerHTML = `
        <div><strong>Name:</strong> ${item.name}</div>
        <div><strong>Completed:</strong> ${item.completed ? 'Yes':'No'}</div>
        <div><strong>Date:</strong> ${formattedDate}</div>
    `;
    container.appendChild(tile);
  });
}

function toggleIcons() {
  const searchValue = document.getElementById('task-name').value.trim();
  const icons = document.querySelectorAll('.icons'); // Select all icons

  // Toggle visibility based on whether searchValue is empty or not
  if (searchValue) {
    icons.forEach(icon => icon.style.display = 'block'); // Show icons
  } else {
    icons.forEach(icon => icon.style.display = 'none'); // Hide icons
  }
}