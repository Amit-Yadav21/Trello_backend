import express from 'express';
import { findTasksByStatus } from '../Controller/taskController.js';

const router = express.Router();
router.get('/taskBoard/find/task/By/Status', findTasksByStatus);

export default router;