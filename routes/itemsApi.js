const express = require("express");
const Item = require("../models/item");
const { collection } = require("../models/item");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((collection) => {
      return res.json(collection);
    });
});

router.post("/", auth, (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ errmsg: "Please enter an item name" });

  const newItem = new Item({ name });
  newItem.save().then((item) => {
    return res.json(item);
  });
});

router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id, (err, collection) => {
    collection
      .remove()
      .then(() => {
        return res.json({ success: true });
      })
      .catch((err) => {
        return res.json({ errmsg: "Invalid or no item Id" });
      });
  });
});

module.exports = router;
