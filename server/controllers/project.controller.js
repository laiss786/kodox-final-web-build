// controllers/project.controller.js
const Project = require('../models/Project.model');
const Joi = require('joi');

const projectSchema = Joi.object({
  title: Joi.string().trim().min(3).max(150).required(),
  description: Joi.string().trim().min(10).max(1000).required(),
  category: Joi.string().valid('Web', 'Marketing', 'IoT', 'IT').required(),
  imageUrl: Joi.string().uri().optional().allow(''),
  tags: Joi.array().items(Joi.string().trim().max(30)).optional(),
  liveUrl: Joi.string().uri().optional().allow(''),
  githubUrl: Joi.string().uri().optional().allow(''),
  featured: Joi.boolean().optional(),
  order: Joi.number().optional(),
});

// @desc   Get all projects
// @route  GET /api/projects
// @access Public
exports.getProjects = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
};

// @desc   Get single project
// @route  GET /api/projects/:id
// @access Public
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// @desc   Create project
// @route  POST /api/projects
// @access Admin
exports.createProject = async (req, res, next) => {
  try {
    const { error, value } = projectSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((d) => d.message).join(', '),
      });
    }
    const project = await Project.create(value);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// @desc   Update project
// @route  PUT /api/projects/:id
// @access Admin
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// @desc   Delete project
// @route  DELETE /api/projects/:id
// @access Admin
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};
