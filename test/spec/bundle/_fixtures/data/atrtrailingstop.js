module.exports = {
  plot: [
    { date: new Date(2014, 2, 5), up: 2, down: null },
    { date: new Date(2014, 2, 6), up: null, down: 3 }
  ],
  input: require('./ohlc').facebook.slice(31, 50),
  expected: [
    { date: new Date(2012, 6, 24), up: 25.20357142857143, down: null },
    { date: new Date(2012, 6, 25), up: 26.023316326530615, down: null },
    { date: new Date(2012, 6, 26), up: 26.023316326530615, down: null },
    { date: new Date(2012, 6, 27), up: null, down: 28.068416024573093 },
    { date: new Date(2012, 6, 30), up: null, down: 27.413529165675012 }
  ]
};