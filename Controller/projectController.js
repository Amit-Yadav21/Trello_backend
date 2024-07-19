import { Project } from '../Models/projectSchema.js';

// Get All Projects
const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({ message: "find all Project successfully.", project: projects });
  } catch (error) {
    const err = new Error("Server Error !")
    err.status = 500;
    return next(err)
  }
};

// Get Logged-in User's Projects
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.user.email });
    res.status(200).json({ message: "Project find successfully.", project: projects });
  } catch (error) {
    const err = new Error("Server Error !")
    err.status = 500;
    return next(err)
  }
};

// Create a New Project for Logged-in User
const createProject = async (req, res, next) => {
  const { projectName, description } = req.body;
  const { email } = req.user;

  try {
    if (!projectName || !description) {
      const err = new Error("project Name, description are required")
      err.status = 404;
      return next(err)
    }

    const existingProject = await Project.findOne({ projectName, user: email });
    if (existingProject) {
      const err = new Error("Project already exist...")
      err.status = 400;
      return next(err)
    }

    const project = new Project({
      projectName,
      description,
      user: req.user.email,
    });

    await project.save();
    res.status(200).json({ message: "Project ceated successfully.", project: project });
  } catch (error) {
    const err = new Error("Server Error !")
    err.status = 500;
    return next(err)
  }
};

// Update Logged-in User's Project
const updateProject = async (req, res, next) => {
  const { projectName, newName, description, status } = req.body;
  const { email } = req.user;

  try {
    const existingProject = await Project.findOne({ projectName, user: email });
    if (!existingProject) {
      const err = new Error("Project not found for updation")
      err.status = 404;
      return next(err)
    }

    const updatedProject = await Project.findOneAndUpdate(
      { projectName, user: email },
      {
        projectName: newName || existingProject.projectName,
        description: description || existingProject.description,
        status: status || existingProject.status
      },
      { new: true }
    );

    res.status(200).json({ message: "Project updated successfully.", updatedProject });
  } catch (error) {
    console.error(error);
    const err = new Error("Server Error !")
    err.status = 500;
    return next(err)
  }
}

// Change Status of Logged-in User's Project
const changeProjectStatus = async (req, res, next) => {
  const { projectName, status } = req.body;
  const { email } = req.user;

  try {
    // Check if the project exists
    const project = await Project.findOne({ projectName, user: email });
    if (!project) {
      const err = new Error("Project not found for change project status")
      err.status = 404;
      return next(err)
    }
    // Update the project status
    project.status = status;
    await project.save();

    res.status(200).json({ message: "Project status updated successfully", project });
  } catch (error) {
    console.error(error);
    const err = new Error("Server Error !")
    err.status = 500;
    return next(err)
  }
};


export { getAllProjects, getProjects, createProject, updateProject, changeProjectStatus };