import { Task } from '../Models/taskSchema.js';
import { Project } from '../Models/projectSchema.js';
import { validationResult } from 'express-validator';

const createNewTask = async (req, res, next) => {
    const { taskName, description, status, tags, dueDate, project } = req.body;
    const { email } = req.user;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(error => ({
                value: error.value,
                field: error.path,
                msg: error.msg
            }));
            return res.status(400).json({ errors: formattedErrors });
        }

         
        // Check if assigned user exists
        const taskExists = await Task.findOne({ taskName, project, assignedUser: req.user.email });
        if (taskExists) {
            const err = new Error(`Task already assigned this user :- ${email}`)
            err.status = 400;
            return next(err)
        }

        // Check if project exists
        const projectExists = await Project.findOne({ name: project });
        if (!projectExists) {
            const err = new Error("Project does not exist")
            err.status = 404;
            return next(err)
        }

        const newTask = new Task({
            taskName,
            description,
            status,
            tags,
            dueDate,
            assignedUser: email,
            project: projectExists.name
        });

        await newTask.save();
        res.status(200).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.error(error);
        const err = new Error("Server Error")
        err.status = 500;
        return next(err)
    }
};

const findAllTask = async (req, res, next) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ message: "All Task find successfully", tasks });
    } catch (error) {
        console.error(error);
        const err = new Error("Server Error")
        err.status = 500;
        return next(err)
    }
};

const findTaskByAssignedUser = async (req, res, next) => {
    try {
        const tasks = await Task.find({ assignedUser: req.user.email });
        if (!tasks || tasks.length === 0) {
            const err = new Error("No tasks found for the assigned user")
            err.status = 404;
            return next(err)
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

        res.status(200).json({ message: "Tasks grouped by status fetched successfully", tasks: groupedTasks });

    } catch (error) {
        console.error(error);
        const err = new Error("Server Error")
        err.status = 500;
        return next(err)
    }
};

const findTasksByStatus = async (req, res) => {
    try {
        const tasks = await Task.find({});
        const groupedTasks = {
            Backlog: [],
            InDiscussion: [],
            InProgress: [],
            Done: []
        };

        tasks.forEach(task => {
            groupedTasks[task.status.replace(' ', '')].push(task);
        });

        res.status(200).json({ message: "Tasks grouped by status fetched successfully", tasks: groupedTasks });
    } catch (error) {
        console.error(error);
        const err = new Error("Server Error !")
        err.status = 500;
        return next(err)
    }
};

const updateTaskByProjectName = async (req, res, next) => {
    const { taskName, newName, description, status, tags, project } = req.body;
    const { email } = req.user;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(error => ({
                value: error.value,
                field: error.path,
                msg: error.msg
            }));
            return res.status(400).json({ errors: formattedErrors });
        }

        const checkTasks = await Task.find({ project, assignedUser: email });
        if (!checkTasks || checkTasks.length === 0) {
            const err = new Error("Project and assigned user not available.")
            err.status = 404;
            return next(err)
        }

        const task = await Task.findOne({ project, assignedUser: email });
        if (task) {
            const err = new Error(`Project name and assignedUser :- ${email}, already Exist...`)
            err.status = 400;
            return next(err)
        }

        const updatedTask = await Task.findOneAndUpdate(
            { assignedUser: email },
            {
                taskName: newName || taskName,
                description: description || task.description,
                status: status || task.status,
                tags: tags || task.tags,
                project: project || task.project
            },
            { new: true }
        );

        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        console.error(error);
        const err = new Error("Server Error")
        err.status = 500;
        return next(err)
    }
};

const deleteTaskByProjectName = async (req, res, next) => {
    const { project } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(error => ({
                value: error.value,
                field: error.path,
                msg: error.msg
            }));
            return res.status(400).json({ errors: formattedErrors });
        }

        const deletedTask = await Task.findOneAndDelete({ project: project });

        if (!deletedTask || deletedTask.length === 0) {
            const err = new Error("No tasks found to delete")
            err.status = 500;
            return next(err)
        }
        res.status(200).json({ message: "Tasks deleted successfully" });
    } catch (error) {
        console.error(error);
        const err = new Error("Server Error")
        err.status = 500;
        return next(err)
    }
};

export { createNewTask, findAllTask, findTaskByAssignedUser, findTasksByStatus, updateTaskByProjectName, deleteTaskByProjectName };
