// Routes/tasks.js

const express = require('express');
const tasks = express.Router();
const {getAllTasks,getSingleTask,postTasks,patchTasks,deleteTasks} = require('../Controllers/tasks_main');

tasks.route('/').get(getAllTasks).post(postTasks);
tasks.route('/:id').get(getSingleTask).patch(patchTasks).delete(deleteTasks)

module.exports = tasks;