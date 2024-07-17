import Project from '../models/Project.js';

// Get Logged-in User's Projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.email });
    res.status(200).json({message:"Project find successfully.", project : projects});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a New Project for Logged-in User
const createProject = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Project name is required' });
  }

  try {
    const project = new Project({
      name,
      description,
      user: req.user.email,
      status: 'active'
    });

    await project.save();
    res.status(200).json({message:"Project ceated successfully.", project : project});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Logged-in User's Project
const updateProject = async (req, res) => {
    const { name, newName, description } = req.body;
    const { email } = req.user;

    try {
        const updateProject = await Project.findOneAndUpdate(
            { name, email },
            {
                name: newName || name,
                description: description || updateProject.description
            },
            { new: true }
        );
        if (!updateProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({message:"Project updated successfully.", updateProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while updating the project." });
    }
}

// Change Status of Logged-in User's Project
const changeProjectStatus = async (req, res) => {
    const { name } = req.body;
    const { email } = req.user;

    try {
        const projectStatus = await Project.findOneAndUpdate(
            { name, email },
            { status: 'canceled' },
            { new: true }
        );
        if (!projectStatus) {
            return res.status(404).json({ message: "projectStatus not found" });
        }
        res.status(200).json({ projectStatus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while canceling the projectStatus." });
    }
};


export { getProjects, createProject, updateProject, changeProjectStatus };