import express from 'express';
import { createTask, findAllTask, findSingleTask, updateTask } from '../Controller/taskController.js';
import { verifyToken } from '../Midlewere/authentication.js';

const router = express.Router();

router.post('/task/create', verifyToken, createTask);
router.get('/task/findAllTask', verifyToken, findAllTask);
router.get('/task/findSingleTask', verifyToken, findSingleTask);
router.put('/task/updateTask', verifyToken, updateTask);

export default router;