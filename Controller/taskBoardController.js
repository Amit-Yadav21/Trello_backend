import { Task } from '../Models/taskSchema.js';

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

export { findTasksByStatus };