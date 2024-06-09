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
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div class="flex">
      <div class="crud-section">
        <h3>Create Issue</h3>
        <input v-model="newIssue.id" placeholder="ID" />
        <input v-model="newIssue.title" placeholder="Title" />
        <input v-model="newIssue.description" placeholder="Description" />
        <button @click="createIssue">Create</button>
      </div>
      <div class="crud-section">
        <h3>Update Issue</h3>
        <input v-model="updateIssue.id" placeholder="ID" />
        <input v-model="updateIssue.title" placeholder="Title" />
        <input v-model="updateIssue.description" placeholder="Description" />
        <button @click="updateIssueMethod">Update</button>
      </div>
      <div class="crud-section">
        <h3>Delete Issue</h3>
        <input v-model="deleteId" placeholder="ID" />
        <button @click="deleteIssue">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  gap: 6rem;
}

.crud-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
      deleteId: '',
      errorMessage: '',
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
      this.errorMessage = '';
      axios.post(`http://localhost:${PORT}/issues`, this.newIssue)
        .then(response => {
          this.issues.push(response.data);
          this.newIssue = { id: '', title: '', description: '' };
        })
        .catch(error => {
          this.errorMessage = 'Create Error: '
          if (error.response && error.response.status === 406) {
            this.errorMessage += error.response.data.error;
          } else {
            this.errorMessage += 'An unexpected error occurred';
          }
          console.error('Create Error:', error); // Fallback error catching
        });
    },
    updateIssueMethod() {
      this.errorMessage = '';
      axios.put(`http://localhost:${PORT}/issues/${this.updateIssue.id}`, this.updateIssue)
        .then(response => {
          this.issues = response.data;
          this.updateIssue = { id: '', title: '', description: '' };
        })
        .catch(error => {
          this.errorMessage = 'Update Error: '
          if (error.response && error.response.status === 406) {
            this.errorMessage += error.response.data.error;
          } else {
            this.errorMessage += 'An unexpected error occurred';
          }
          console.error('Create Error:', error); // Fallback error catching
        });
    },
    deleteIssue() {
      this.errorMessage = '';
      axios.delete(`http://localhost:${PORT}/issues/${this.deleteId}`)
        .then(() => {
          this.issues = this.issues.filter(issue => issue.id != this.deleteId);
          this.deleteId = '';
        })
        .catch(error => {
          this.errorMessage = 'Delete Error: '
          if (error.response && error.response.status === 406) {
            this.errorMessage += error.response.data.error;
          } else {
            this.errorMessage += 'An unexpected error occurred';
          }
          console.error('Create Error:', error); // Fallback error catching
        });
    }
  }
};
</script>