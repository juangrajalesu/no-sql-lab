const express = require('express');
const Author = require('../models/author');

const router = express.Router();


 router.get('/C1', async (req, res) => {
  try {
    let filters = {pais: 'Colombia'};
    const authors = await Author.find(filters,{_id:0, publicados:0,pais:0,__v:0}).$where('this.publicados <= 20');
    res.json(authors);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/C2', async (req, res) =>{
  try {
    let filters = {};
    const authors = await Author.find(filters,{_id:0,publicados:0,pais:0,__v:0}).$where('this.apellido != undefined');
    res.json(authors);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/C3', async (req, res) => {
  try {
    let filters = {};
    const authors = await Author.find(filters,{_id:0,nombre:0,publicados:0,pais:0,__v:0}).$where('this.publicados > 20 || this.pais == "Argentina"');
    res.json(authors);
    
  } catch (err) {
    res.status(500).json({message:err.message});
  }
});
/**
 * GET authors listing. 
 */
router.get('/', async (req, res) => {
  try {
    let filters = {};
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find(filters);
    console.log(authors[2].apellido)
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



/**
 * Create a new Author
 */
router.post('/', async (req, res) => {
  try {
    let author = new Author(req.body);
    author = await author.save({ new: true });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
