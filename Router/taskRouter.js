import express from 'express';
import { createTask, findAllTask } from '../Controller/taskController.js';
import { verifyToken } from '../Midlewere/authentication.js';

const router = express.Router();

router.post('/task/create', verifyToken, createTask);
router.get('/task/findAllTask', verifyToken, findAllTask);

export default router;