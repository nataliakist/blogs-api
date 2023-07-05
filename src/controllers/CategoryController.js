const CategoryService = require('../services/CategoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = await CategoryService.createCategory({ name });

  if (category.message) return res.status(400).json(category);

  return res.status(201).json(category);
};

const getAll = async (req, res) => {
  const categories = await CategoryService.getAll();

  return res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAll,
};