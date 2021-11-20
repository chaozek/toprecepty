const router = require("express").Router();
const Recipe = require("../models/recipe");
const auth = require("../middleware/auth");
router.get("/", async (req, res) => {
  try {
    const foundRecipes = await Recipe.find();
    res.status(200).send(foundRecipes);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/search", async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const recipes = await Recipe.find({ $or: [{ title }] });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const foundRecipe = await Recipe.findById(req.params.id);
    res.status(200).send(foundRecipe);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.post("/", auth, async (req, res) => {
  const newRecipe = new Recipe({
    ...req.body,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  // Alternative is to use express-validator
  if (!req.body.title) {
    res.status(400).send("Title must be at least 1 character long");
    return;
  } else if (!req.body.cookTime) {
    res.status(400).send("Cook time must be at least 1 character long");
    return;
  } else if (!req.body.level) {
    res.status(400).send("Choose one level from dropdown");
    return;
  } else if (!req.body.img) {
    res.status(400).send("Add Image");
    return;
  } else if (req.body.ingrediencies.length < 1) {
    res.status(400).send("Add at least 1 ingredience");
    return;
  } else if (req.body.tutorial.length < 1) {
    res.status(400).send("Add at least 1 step");
    return;
  }
  try {
    const savedRecipe = await newRecipe.save();
    res.status(200).json(savedRecipe);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/edit/:id", async (req, res) => {
  const foundRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  try {
    res.status(200).json(foundRecipe);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndRemove(req.params.id);
    res.status(200).json("DELETED");
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
