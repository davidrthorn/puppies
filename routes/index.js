const express = require('express');
const router = express.Router();

const db = require('../queries')

// HOME PAGE

router.get('/', (req, res, next) => {
  res.send('This is your home page!')
})

// Routes

router.get('/api/puppies', db.getAllPuppies)
router.get('/api/puppies/:id', db.getSinglePuppy)
router.post('/api/puppies', db.createPuppy)
router.put('/api/puppies/:id', db.updatePuppy)
router.delete('/api/puppies/:id', db.removePuppy)

module.exports = router;
