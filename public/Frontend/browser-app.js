function performSearch() {
  axios.get('/api/v1/tasks')
    .then(response => {
      console.log("Tasks fetched successfully:", response.data);
      // Handle the response data (e.g., update the UI with the tasks)
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
    if (Array.isArray(data.tasks)) {
      displayTiles(data.tasks);
    } else {
      console.error('Data.tasks is not an array:', data.tasks);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayTiles(data) {
  const container = document.getElementById('tiles-container');
  container.innerHTML = ''; // Clear existing tiles
  console.log('Data to display:', data); // Debugging line
  data.forEach(item => {
    const tile = document.createElement('div');
    tile.className = 'tile';

    // Convert JSON object to string for display
    const jsonData = JSON.stringify(item, null, 2); // Pretty-print JSON data

    tile.innerHTML = `
        <pre>${jsonData}</pre> <!-- Use <pre> to preserve formatting -->
    `;
    container.appendChild(tile);
  });
}