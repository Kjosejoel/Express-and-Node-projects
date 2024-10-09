// Routes/tasks.js

const express = require('express');
const tasks = express.Router();
const {getAllTasks,getSingleTask,postTasks,patchTasks,deleteTasks,getAllTasks1,getPlannedTasks, getCompletedTasks,getTodayTasks} = require('../Controllers/tasks_main');

tasks.route('/planned').get(getPlannedTasks)
tasks.route('/filter').get(getAllTasks1);
tasks.route('/completed').get(getCompletedTasks);
tasks.route('/today').get(getTodayTasks);
tasks.route('/').get(getAllTasks).post(postTasks);
tasks.route('/:id').get(getSingleTask).patch(patchTasks).delete(deleteTasks)

module.exports = tasks;