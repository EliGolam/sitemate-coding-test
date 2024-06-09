// Base Setup
const express = require('express');
const app = express();
const PORT = 3000;

// Initializing APP
app.use(express.json());

let issues = [
  { id: 1, title: "Issue 1", description: "Description for issue 1" },
  { id: 2, title: "Issue 2", description: "Description for issue 2" }
];

// Create
app.post('/issues', (req, res) => {
  const issue = req.body;
  console.log('Create:', issue);
  issues.push(issue);
  res.status(201).send(issue);
});

// Read
app.get('/issues', (req, res) => {
  res.json(issues);
});

// Update
app.put('/issues/:id', (req, res) => {
  const { id } = req.params;
  const updatedIssue = req.body;
  console.log('Update:', updatedIssue);
  issues = issues.map(issue => issue.id == id ? updatedIssue : issue);
  res.send(updatedIssue);
});

// Delete
app.delete('/issues/:id', (req, res) => {
  const { id } = req.params;
  console.log('Delete:', id);
  issues = issues.filter(issue => issue.id != id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
