import express from 'express';
import { createNewTask, findAllTask, findTaskByAssignedUser, updateTaskByProjectName, deleteTaskByProjectName } from '../Controller/taskController.js';
import { verifyToken } from '../Midlewere/authentication.js';

const router = express.Router();

router.post('/create', verifyToken, createNewTask);
router.get('/find/all', findAllTask);
router.get('/find/task/By/AssignedUser', verifyToken, findTaskByAssignedUser);
router.put('/update', verifyToken, updateTaskByProjectName);
router.delete('/delete', verifyToken, deleteTaskByProjectName);

export default router;