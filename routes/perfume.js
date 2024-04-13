const express = require('express');
const router = express.Router();
const Perfume = require('../models/perfumeModel'); 


router.get('/', async (req, res) => {
  try {
    const perfumes = await Perfume.find({});
    res.json(perfumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.id);
    if (!perfume) {
      return res.status(404).json({ message: 'Perfume not found' });
    }
    res.json(perfume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  const perfume = new Perfume(req.body);
  try {
    const newPerfume = await perfume.save();
    res.status(201).json(newPerfume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const updatedPerfume = await Perfume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPerfume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedPerfume = await Perfume.findByIdAndDelete(req.params.id);
    if (!deletedPerfume) {
      return res.status(404).json({ message: 'Perfume not found' });
    }
    res.json({ message: 'Deleted Perfume', perfume: deletedPerfume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
