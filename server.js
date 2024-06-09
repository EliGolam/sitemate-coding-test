// Base Setup
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

// Initializing APP
app.use(cors());
app.use(express.json());

class Issue {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  update(title, description) {
    this.title = title;
    this.description = description;
  }

  static findById(id) {
    return issues.find(issue => issue.id == id);
  }

  static deleteById(id) {
    const index = issues.findIndex(issue => issue.id == id);
    if (index !== -1) {
      issues.splice(index, 1);
      return true;
    }
    return false;
  }
}

let issues = [
  new Issue(1, "Issue 1", "Description for issue 1"),
  new Issue(2, "Issue 2", "Description for issue 2")
];

// Create
app.post('/issues', (req, res) => {
  const issue = req.body;

  if (checkId(issue.id)) {
    console.log('Failed to Create Issue: ID is not valid', issue);
    return res.status(406).send({ error: 'ID is not valid' });
  } else if (idExists(issue.id)) {
    console.log('Failed to Create Issue: ID already exists in the issues', issue);
    return res.status(406).send({ error: 'ID already exists in the issues' });
  } else if (checkText(issue.title)) {
    console.log('Failed to Create Issue: Title not provided', issue);
    return res.status(406).send({ error: 'Title not provided' });
  } else if (checkText(issue.description)) {
    console.log('Failed to Create Issue: Description not provided', issue);
    return res.status(406).send({ error: 'Description not provided' });
  }

  issues.push(new Issue(issue.id, issue.title, issue.description));
  console.log('Create:', issue);
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

  if (checkId(id)) {
    console.log('Failed to Update Issue: ID is not valid', updatedIssue);
    return res.status(406).send({ error: 'ID is not valid' });
  } else if (!idExists(id)) {
    console.log('Failed to Update Issue: ID does not exist', updatedIssue);
    return res.status(406).send({ error: 'ID does not exist' });
  } else if (checkText(updatedIssue.title)) {
    console.log('Failed to Update Issue: Title not provided', updatedIssue);
    return res.status(406).send({ error: 'Title not provided' });
  } else if (checkText(updatedIssue.description)) {
    console.log('Failed to Update Issue: Description not provided', updatedIssue);
    return res.status(406).send({ error: 'Description not provided' });
  }

  const issue = Issue.findById(id);
  issue.update(updatedIssue.title, updatedIssue.description);
  console.log('Update:', updatedIssue);
  res.send(issues);
});

// Delete
app.delete('/issues/:id', (req, res) => {
  const { id } = req.params;

  if (checkId(id)) { 
    console.log('Failed to Delete Issue: ID is not valid', id);
    return res.status(406).send({error: 'ID is not valid'});
  }
  else if (!idExists(id)) {
    console.log('Failed to Delete Issue: ID does not exist', id);
    return res.status(406).send({error: 'ID does not exist'});
  }

  const deleted = Issue.deleteById(id);
  if (deleted) { // Deleted Successfully
    console.log('Delete:', id);
    res.status(204).send(issues);
  } else {
    res.status(500).send({ error: 'Failed to delete issue' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Check Control
function checkId(id) {
  return !Number.isInteger(parseInt(id));
  // return checkText(id);
}

function idExists(id) {
  return !!Issue.findById(id);
  // for (let issue of issues) {
  //   if (issue.id == id) {
  //     return true
  //   }
  // }
  // return false;
}

function checkText(text) {
  return text == null || text.trim() == '';
}