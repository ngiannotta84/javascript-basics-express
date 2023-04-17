const express = require('express');

const app = express();
app.use(express.json());

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

function validateParamsNumbers(req, res, next) {
  const { num1, num2 } = req.params; // it has to match with the objects keys name in the test in this case a and b
  if (Number.isNaN(Number(num1)) || Number.isNaN(Number(num2))) {
    return res.status(400).json({ error: 'Parameters must be valid numbers.' });
  }
  return next();
}
function validateBodyNumbers(req, res, next) {
  const { a, b } = req.body;
  if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) {
    return res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }
  return next();
}
function requireBodyNumber(req, res, next) {
  const { a, b } = req.body;
  if (a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }
  return next();
}
function errIfdividedByzero(req, res, next) {
  const { b } = req.body;
  if (b === 0) {
    return res.status(400).json({ error: 'Unable to divide by 0.' });
  }
  return next();
}
app.get('/numbers/add/:num1/and/:num2', validateParamsNumbers, (req, res) => {
  const { num1, num2 } = req.params; // it has to match with the names in the,in this case a and b num 1 and num2
  res.status(200).json({ result: add(+num1, +num2) });
});
app.get('/numbers/subtract/:num1/from/:num2', validateParamsNumbers, (req, res) => {
  const { num1, num2 } = req.params;
  res.status(200).json({ result: subtract(+num2, +num1) });
});
app.post('/numbers/multiply', requireBodyNumber, validateBodyNumbers, (req, res) => {
  const { a, b } = req.body;
  res.status(200).json({ result: multiply(a, b) });
});
app.post(
  '/numbers/divide',
  requireBodyNumber,
  validateBodyNumbers,
  errIfdividedByzero,
  (req, res) => {
    const { a, b } = req.body; // it has to match with the objects keys name in the test in this case a and b
    res.status(200).json({ result: divide(a, b) });
  },
);
app.post(
  '/numbers/remainder',
  requireBodyNumber,
  validateBodyNumbers,
  errIfdividedByzero,
  (req, res) => {
    const { a, b } = req.body; // it has to match with the objects keys name in the test in this case a and b
    res.status(200).json({ result: remainder(a, b) });
  },
);
const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');

function validateParams(req, res, next) {
  const { value } = req.params;
  if (Number.isNaN(Number(value))) {
    return res.status(400).json({ error: 'Parameter must be a number.' });
  }
  return next();
}
function isNotSingleChar(req, res, next) {
  const { value2 } = req.params;
  if (value2.length !== 1) {
    return res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  }
  return next();
}
app.post('/booleans/negate', (req, res) => {
  const { value } = req.body; // it has to match with the objects key name in the test in this case value.
  res.status(200).json({ result: negate(value) });
});
app.post('/booleans/truthiness', (req, res) => {
  const { value } = req.body;
  res.status(200).json({ result: truthiness(value) });
});
app.get('/booleans/is-odd/:value', validateParams, (req, res) => {
  const { value } = req.params;
  res.status(200).json({ result: isOdd(value) });
});
app.get('/booleans/:value1/starts-with/:value2', isNotSingleChar, (req, res) => {
  const { value1, value2 } = req.params;
  res.status(200).json({ result: startsWith(value2, value1) });
});

module.exports = app;
