import { Task } from '../Models/taskSchema.js';

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

export { findTaskByAssignedUser };