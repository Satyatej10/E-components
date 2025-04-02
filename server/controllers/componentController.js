const Component = require("../models/Component");

// Fetch all components
// Fetch components (all or filtered by category)
const getComponents = async (req, res) => {
  try {
      const { category } = req.query;
      let query = {};

      if (category) {
          query.category = new RegExp(`^${category}$`, "i"); // Case-insensitive exact match
      }

      const components = await Component.find(query);
      res.status(200).json(components);
  } catch (error) {
      res.status(500).json({ message: "Server Error" });
  }
};

  
// Add a new component
const addComponent = async (req, res) => {
  try {
    const { name, category, code } = req.body;
    console.log(name);
    const newComponent = new Component({ name, category, code });
    await newComponent.save();
    res.status(201).json(newComponent);
  } catch (error) {
    res.status(500).json({ message: "Error adding component" });
  }
};

module.exports = { getComponents, addComponent };
