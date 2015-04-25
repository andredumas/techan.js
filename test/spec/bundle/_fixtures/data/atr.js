module.exports = {
  plot: [
    { date: new Date(2014, 2, 5), value: 1 },
    { date: new Date(2014, 2, 6), value: 2 },
    { date: new Date(2014, 2, 7), value: 0.5 }
  ],
  input: require('./ohlc').facebook.slice(0, 21),
  expected: [
    { date: new Date(2012, 5, 8), value: 2.1978571428571434 },
    { date: new Date(2012, 5, 11), value: 2.128724489795919 },
    { date: new Date(2012, 5, 12), value: 2.0345298833819245 },
    { date: new Date(2012, 5, 13), value: 1.960634891711787 },
    { date: new Date(2012, 5, 14), value: 1.8955895423038025 },
    { date: new Date(2012, 5, 15), value: 1.8894760035678166 },
    { date: new Date(2012, 5, 18), value: 1.9452277175986867 }
  ]
};