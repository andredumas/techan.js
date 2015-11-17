var alternating = require('./ohlc').alternating;

module.exports = {
  alternating: [
    { date: alternating.up.date, type: 'buy', price: alternating.up.close },
    { date: alternating.down.date, type: 'sell', price: alternating.down.close }
  ]
};