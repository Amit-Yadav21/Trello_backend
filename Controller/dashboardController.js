import { Task } from '../Models/taskSchema.js';
import { Project } from '../Models/projectSchema.js';

const findTaskByAssignedUser = async (req, res, next) => {
    try {
        const tasks = await Task.find({ assignedUser: req.user.email });
        if (!tasks || tasks.length === 0) {
            const err = new Error("No tasks found for the assigned user");
            err.status = 404;
            return next(err);
        }

        const groupedTasks = {
            Backlog: [],
            InDiscussion: [],
            InProgress: [],
            Done: []
        };

        tasks.forEach(task => {
            groupedTasks[task.status.replace(' ', '')].push(task);
        });

        req.groupedTasks = groupedTasks;
        next();
    } catch (error) {
        console.error(error);
        const err = new Error("Server Error");
        err.status = 500;
        return next(err);
    }
};

const getProjectsAssignedUser = async (req, res, next) => {
    try {
        const projects = await Project.find({ user: req.user.email });
        req.projects = projects;
        next();
    } catch (error) {
        const err = new Error("Server Error !");
        err.status = 500;
        return next(err);
    }
};

const finalResponse = (req, res) => {
    res.status(200).json({
        message: "Data fetched successfully",
        tasksBoard: req.groupedTasks,
        projects: req.projects
    });
};

export { findTaskByAssignedUser, getProjectsAssignedUser, finalResponse };
