const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item')

//@route GET api/items
//@desc Get All items
//@access Public
router.get('/', async (req, res) => {
  try {
    const ItemsList = await Item.find().sort({ date: -1 });
    if (ItemsList) {
      return res.status(200).json(ItemsList)
    }
  } catch (err) {
    res.send(400).send({ msg: err })
  }
})

//@route POST api/items
//@desc Create an item
//@access Public
router.post('/', async (req, res) => {
  const { name } = req.body;
  const newItem = new Item({
    name
  });
  try {
    const savedItem = await newItem.save();
    res.status(200).send(savedItem)
  } catch (err) {
    res.send(400).send({ msg: err })
  }
})

module.exports = router;