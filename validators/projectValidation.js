import { body } from 'express-validator';


const validatecreateProject = [
    body('projectName')
        .notEmpty().withMessage('Project name is required')
        .isLength({ max: 100 }).withMessage('Project name cannot exceed 100 characters'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
];

const validateupdateProject = [
    body('projectName')
        .notEmpty().withMessage('Project name is required')
        .isLength({ max: 100 }).withMessage('Project name cannot exceed 100 characters'),
    body('newName')
        .notEmpty().withMessage('newName name is required')
        .isLength({ max: 100 }).withMessage('New project name cannot exceed 100 characters'),
    body('description')
        .notEmpty().withMessage('description name is required')
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    body('status')
        .notEmpty().withMessage('description name is required')
];

const validatechangeProjectStatus = [
    body('projectName')
        .notEmpty().withMessage('Project name is required'),
    body('status')
        .notEmpty().withMessage('Status is required')
];

export { validatecreateProject, validateupdateProject, validatechangeProjectStatus };