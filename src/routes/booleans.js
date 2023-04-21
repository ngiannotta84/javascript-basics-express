const { Router } = require('express');

const { negate, truthiness, isOdd, startsWith } = require('../lib/booleans');

const router = Router();

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

router
  .post('/negate', (req, res) => {
    const { value } = req.body; // it has to match with the objects key name in the test in this case value.
    res.status(200).json({ result: negate(value) });
  })
  .post('/truthiness', (req, res) => {
    const { value } = req.body;
    res.status(200).json({ result: truthiness(value) });
  })
  .get('/is-odd/:value', validateParams, (req, res) => {
    const { value } = req.params;
    res.status(200).json({ result: isOdd(value) });
  })
  .get('/:value1/starts-with/:value2', isNotSingleChar, (req, res) => {
    const { value1, value2 } = req.params;
    res.status(200).json({ result: startsWith(value2, value1) });
  });

module.exports = router;
