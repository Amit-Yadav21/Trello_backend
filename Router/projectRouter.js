import express from 'express';
import { getProjects, createProject, updateProject, changeProjectStatus } from '../controllers/projectController.js';
import { verifyToken } from '../Midlewere/authentication.js';

const router = express.Router();

router.get('/project/get', verifyToken, getProjects);
router.post('/project/create', verifyToken, createProject);
router.put('/project/update', verifyToken, updateProject);
router.patch('/project/changeStatus', verifyToken, changeProjectStatus);

export default router;