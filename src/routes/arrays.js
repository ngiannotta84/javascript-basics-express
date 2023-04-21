const { Router } = require('express');

const {
  getNthElement,
  arrayToCSVString,
  addToArray2,
  elementsStartingWithAVowel,
  removeNthElement2,
} = require('../lib/arrays');

const router = Router();
router

  .post('/element-at-index/:index', (req, res) => {
    const { index } = req.params;
    const { array } = req.body;
    res.status(200).json({ result: getNthElement(index, array) });
  })
  .post('/to-string', (req, res) => {
    const { array } = req.body;
    res.status(200).json({ result: arrayToCSVString(array) });
  })
  .post('/append', (req, res) => {
    const { value } = req.body;
    const { array } = req.body;
    res.status(200).json({ result: addToArray2(value, array) });
  })
  .post('/starts-with-vowel', (req, res) => {
    const { array } = req.body;
    res.status(200).json({ result: elementsStartingWithAVowel(array) });
  })
  .post('/remove-element', (req, res) => {
    const index = req.query.index || 0;
    const { array } = req.body;
    res.status(200).json({ result: removeNthElement2(index, array) });
  });
module.exports = router;
