const { Router } = require('express');

const { add, subtract, multiply, divide, remainder } = require('../lib/numbers');

const router = Router();

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
router
  .get('/add/:num1/and/:num2', validateParamsNumbers, (req, res) => {
    const { num1, num2 } = req.params; // it has to match with the names in the,in this case a and b num 1 and num2
    res.status(200).json({ result: add(+num1, +num2) });
  })
  .get('/subtract/:num1/from/:num2', validateParamsNumbers, (req, res) => {
    const { num1, num2 } = req.params;
    res.status(200).json({ result: subtract(+num2, +num1) });
  })
  .post('/multiply', requireBodyNumber, validateBodyNumbers, (req, res) => {
    const { a, b } = req.body;
    res.status(200).json({ result: multiply(a, b) });
  })
  .post('/divide', requireBodyNumber, validateBodyNumbers, errIfdividedByzero, (req, res) => {
    const { a, b } = req.body; // it has to match with the objects keys name in the test in this case a and b
    res.status(200).json({ result: divide(a, b) });
  })
  .post('/remainder', requireBodyNumber, validateBodyNumbers, errIfdividedByzero, (req, res) => {
    const { a, b } = req.body; // it has to match with the objects keys name in the test in this case a and b
    res.status(200).json({ result: remainder(a, b) });
  });
module.exports = router;
