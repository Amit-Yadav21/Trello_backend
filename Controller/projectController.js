import { Project } from '../Models/projectSchema.js';

// Get All Projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({ message: "find all Project successfully.", project: projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Logged-in User's Projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.email });
    res.status(200).json({ message: "Project find successfully.", project: projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a New Project for Logged-in User
const createProject = async (req, res) => {
  const { projectName, description } = req.body;
  const { email } = req.user;

  if (!projectName || !description) {
    return res.status(400).json({ message: 'project Name, description are required' });
  }

  const existingProject = await Project.findOne({ projectName, user: email });
  if (existingProject) {
    return res.status(404).json({ message: "Project already exist..." });
  }

  try {
    const project = new Project({
      projectName,
      description,
      user: req.user.email,
    });

    await project.save();
    res.status(200).json({ message: "Project ceated successfully.", project: project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Logged-in User's Project
const updateProject = async (req, res) => {
  const { projectName, newName, description, status } = req.body;
  const { email } = req.user;

  try {
    const existingProject = await Project.findOne({ projectName, user: email });
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
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
    res.status(500).json({ error: "Something went wrong while updating the project." });
  }
}

// Change Status of Logged-in User's Project
const changeProjectStatus = async (req, res) => {
  const { projectName, status } = req.body;
  const { email } = req.user;

  try {
    // Check if the project exists
    const project = await Project.findOne({ projectName, user: email });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // Update the project status
    project.status = status;
    await project.save();

    res.status(200).json({ message: "Project status updated successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while canceling the projectStatus." });
  }
};


export { getAllProjects, getProjects, createProject, updateProject, changeProjectStatus };