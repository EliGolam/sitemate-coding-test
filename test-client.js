const axios = require('axios');
const PORT = 3000

const apiUrl = `http://localhost:${PORT}/issues`;

// CRUD for a testing ISSUE
axios.post(apiUrl, { id: 3, title: "Issue 3", description: "Description for issue 3" }) // CREATE > POST
  .then(response => console.log('Create Response:', response.data))
  .catch(error => console.error('Create Error:', error));

axios.get(apiUrl) // READ > GET
  .then(response => console.log('Read Response:', response.data)) 
  .catch(error => console.error('Read Error:', error));

axios.put(`${apiUrl}/3`, { id: 3, title: "Updated Issue 3", description: "Updated description for issue 3" }) // UPDATE > PUT
  .then(response => console.log('Update Response:', response.data))
  .catch(error => console.error('Update Error:', error));

axios.delete(`${apiUrl}/3`) // DELETE > DELETE
  .then(() => console.log('Delete Response: Success'))
  .catch(error => console.error('Delete Error:', error));
