module.exports = {
  input: [
    { date: new Date(2014, 0, 1), open: 4, high: 8, low: 2, close: 2 },
    { date: new Date(2014, 0, 2), open: 3, high: 7, low: 3, close: 3, volume: 1000 }
  ],
  expected: [
    { date: new Date(2014, 0, 1), open: 3, high: 8, low: 2, close: 4 },
    { date: new Date(2014, 0, 2), open: 3.5, high: 7, low: 3, close: 4, volume: 1000 }
  ]
};
