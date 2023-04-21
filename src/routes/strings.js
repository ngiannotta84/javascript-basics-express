const { Router } = require('express');

const {
  sayHello,
  uppercase,
  lowercase,
  firstCharacter,
  firstCharacters,
} = require('../lib/strings');

const router = Router();
router
  .get('/hello/:string', (req, res) => {
    res.status(200).json({ result: sayHello(req.params.string) });
  })
  .get('/upper/:string', (req, res) => {
    res.status(200).json({ result: uppercase(req.params.string) });
  })
  .get('/lower/:string', (req, res) => {
    res.status(200).json({ result: lowercase(req.params.string) });
  })
  .get('/first-characters/:string', (req, res) => {
    if (req.query.length === undefined) {
      res.status(200).json({ result: firstCharacter(req.params.string) });
    } else {
      res.status(200).json({ result: firstCharacters(req.params.string, req.query.length) });
    }
  });

// app.get('/strings/first-characters/:string', (req, res) => {
//   const { string } = req.params;
//   const { length } = req.query;
//   if (!length) {
//     res.status(200).json({ result: firstCharacter(string) });
//   } else {
//     res.status(200).json({ result: firstCharacters(string, length) });
//   }
// });
module.exports = router;
