import express from 'express';
import { getAllProjects, getProjects, createProject, updateProject, changeProjectStatus } from '../Controller/projectController.js';
import { verifyToken } from '../middleware/authentication.js';
import {validatecreateProject, validateupdateProject, validatechangeProjectStatus} from '../validators/projectValidation.js';
import handleValidationErrors from '../middleware/handleValidationErrors.js';

const router = express.Router();

router.get('/get/all', getAllProjects);
router.get('/get', verifyToken, getProjects);
router.post('/create',validatecreateProject, handleValidationErrors, verifyToken, createProject);
router.put('/update',validateupdateProject, handleValidationErrors, verifyToken, updateProject);
router.patch('/change/status',validatechangeProjectStatus, handleValidationErrors, verifyToken, changeProjectStatus);

export default router;