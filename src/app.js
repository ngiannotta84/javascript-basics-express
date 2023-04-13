const express = require('express');

const app = express();

const {
  sayHello,
  uppercase,
  lowercase,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');

app.get('/strings/hello/:string', (req, res) => {
  res.status(200).json({ result: sayHello(req.params.string) });
});
app.get('/strings/upper/:string', (req, res) => {
  res.status(200).json({ result: uppercase(req.params.string) });
});
app.get('/strings/lower/:string', (req, res) => {
  res.status(200).json({ result: lowercase(req.params.string) });
});
app.get('/strings/first-characters/:string', (req, res) => {
  console.log(req.query.length);
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
const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');

app.get('/numbers/add/:number1/and/:number2', (req, res) => {
  const a = parseInt(req.params.number1, 10);
  const b = parseInt(req.params.number2, 10);
  res.status(200).json({ result: add(a, b) });
});
module.exports = app;
