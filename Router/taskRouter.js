import express from 'express';
import { createNewTask, findAllTask, findTaskByAssignedUser, findTasksByStatus, updateTaskByProjectName, deleteTaskByProjectName } from '../Controller/taskController.js';
import { verifyToken } from '../Midlewere/authentication.js';

const router = express.Router();

router.post('/task/create', verifyToken, createNewTask);
router.get('/task/findAllTask', findAllTask);
router.get('/task/findTaskByAssignedUser', verifyToken, findTaskByAssignedUser);
router.get('/task/findTasksByStatus', findTasksByStatus);
router.put('/task/updateTask', verifyToken, updateTaskByProjectName);
router.delete('/task/deleteTask', verifyToken, deleteTaskByProjectName);

export default router;