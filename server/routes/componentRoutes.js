const express = require("express");
const { getComponents, addComponent } = require("../controllers/componentController");

const router = express.Router();

router.get("/", getComponents);
router.post("/", addComponent);

module.exports = router;
