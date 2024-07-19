import express from 'express';
import { createNewTask, findAllTask, findTaskByAssignedUser, findTasksByStatus, updateTaskByProjectName, deleteTaskByProjectName } from '../Controller/taskController.js';
import { verifyToken } from '../middleware/authentication.js';
import { validateCreateTask, validateUpdateTaskByProjectName, validateDeleteTaskByProjectName} from '../validators/taskValidation.js';

const router = express.Router();

router.post('/create',validateCreateTask, verifyToken, createNewTask);
router.get('/find/all', findAllTask);
router.get('/find/task/By/AssignedUser', verifyToken, findTaskByAssignedUser);
router.get('/find/task/By/Status', findTasksByStatus);
router.put('/update',validateUpdateTaskByProjectName, verifyToken, updateTaskByProjectName);
router.delete('/delete',validateDeleteTaskByProjectName, verifyToken, deleteTaskByProjectName);

export default router;