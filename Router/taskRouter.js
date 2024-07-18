import express from 'express';
import { createTask } from '../Controller/taskController.js';
import { verifyToken } from '../Midlewere/authentication.js';

const router = express.Router();

router.post('/task/create', verifyToken, createTask);

export default router;