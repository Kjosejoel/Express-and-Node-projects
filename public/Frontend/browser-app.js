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