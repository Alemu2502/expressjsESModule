import express from 'express';
import { taskLists } from '../controller/taskController.js';


export const router = express.Router();

router.route('/tasks')
       .get(taskLists.getAllTasks)
       .post(taskLists.creatNewTask)

router.route('/tasks/:taskId')
       .get(taskLists.getTaskById)
       .patch(taskLists.editTaskById)
       .delete(taskLists.deleteTaskById);       

