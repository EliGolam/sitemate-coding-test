<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <h1>Simple Issues API</h1>
    <h2>List of issues</h2>
    <ul>
      <li v-for="issue in issues" :key="issue.id">
        {{ issue.id }}: {{ issue.title }} - {{ issue.description }}
      </li>
    </ul>

    <h2>CRUD for issues</h2>
    <div>
      <h3>Create Issue</h3>
      <input v-model="newIssue.id" placeholder="ID" />
      <input v-model="newIssue.title" placeholder="Title" />
      <input v-model="newIssue.description" placeholder="Description" />
      <button @click="createIssue">Create</button>
    </div>
    <div>
      <h3>Update Issue</h3>
      <input v-model="updateIssue.id" placeholder="ID" />
      <input v-model="updateIssue.title" placeholder="Title" />
      <input v-model="updateIssue.description" placeholder="Description" />
      <button @click="updateIssueMethod">Update</button>
    </div>
    <div>
      <h3>Delete Issue</h3>
      <input v-model="deleteId" placeholder="ID" />
      <button @click="deleteIssue">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<script>
import axios from 'axios';
const PORT = 3000;

export default {
  data() {
    return {
      issues: [],
      newIssue: { id: '', title: '', description: '' },
      updateIssue: { id: '', title: '', description: '' },
      deleteId: ''
    };
  },
  created() {
    this.readIssues();
  },
  methods: {
    readIssues() {
      axios.get(`http://localhost:${PORT}/issues`)
        .then(response => {
          this.issues = response.data;
        })
        .catch(error => {
          console.error('Read Error:', error);
        });
    },
    createIssue() {
      axios.post(`http://localhost:${PORT}/issues`, this.newIssue)
        .then(response => {
          this.issues.push(response.data);
          this.newIssue = { id: '', title: '', description: '' };
        })
        .catch(error => {
          console.error('Create Error:', error);
        });
    },
    updateIssueMethod() {
      axios.put(`http://localhost:${PORT}/issues/${this.updateIssue.id}`, this.updateIssue)
        .then(response => {
          const index = this.issues.findIndex(issue => issue.id === this.updateIssue.id);
          this.issues.splice(index, 1, response.data);
          this.updateIssue = { id: '', title: '', description: '' };
        })
        .catch(error => {
          console.error('Update Error:', error);
        });
    },
    deleteIssue() {
      axios.delete(`http://localhost:${PORT}/issues/${this.deleteId}`)
        .then(() => {
          this.issues = this.issues.filter(issue => issue.id != this.deleteId);
          this.deleteId = '';
        })
        .catch(error => {
          console.error('Delete Error:', error);
        });
    }
  }
};
</script>