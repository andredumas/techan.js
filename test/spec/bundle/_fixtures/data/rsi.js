module.exports = {
  plot: [
    { date: new Date(2014, 2, 5), rsi: 60, overbought: 70, oversold: 30, middle: 0 },
    { date: new Date(2014, 2, 6), rsi: 34.95, overbought: 70, oversold: 30, middle: 0 },
    { date: new Date(2014, 2, 7), rsi: -5, overbought: 70, oversold: 30, middle: 0 }
  ],
  input: [
    { date: new Date(0), close: 44.34 },
    { date: new Date(1), close: 44.09 },
    { date: new Date(2), close: 44.15 },
    { date: new Date(3), close: 43.61 },
    { date: new Date(4), close: 44.33 },
    { date: new Date(5), close: 44.83 },
    { date: new Date(6), close: 45.10 },
    { date: new Date(7), close: 45.42 },
    { date: new Date(8), close: 45.84 },
    { date: new Date(9), close: 46.08 },
    { date: new Date(10), close: 45.89 },
    { date: new Date(11), close: 46.03 },
    { date: new Date(12), close: 45.61 },
    { date: new Date(13), close: 46.28 },
    { date: new Date(14), close: 46.28 },
    { date: new Date(15), close: 46 },
    { date: new Date(16), close: 46.03 },
    { date: new Date(17), close: 46.41 },
    { date: new Date(18), close: 46.22 },
    { date: new Date(19), close: 45.64 },
    { date: new Date(20), close: 46.21 },
    { date: new Date(21), close: 46.25 }
  ],
  expected: [
    { date: new Date(14), rsi: 70.46413502109705, middle : 50, overbought : 70, oversold : 30 },
    { date: new Date(15), rsi: 62.51079758134174, middle : 50, overbought : 70, oversold : 30 },
    { date: new Date(16), rsi: 63.02671530614472, middle : 50, overbought : 70, oversold : 30 },
    { date: new Date(17), rsi: 69.21800659460254, middle : 50, overbought : 70, oversold : 30 },
    { date: new Date(18), rsi: 63.12012530100334, middle : 50, overbought : 70, oversold : 30 },
    { date: new Date(19), rsi: 48.172259388887376, middle : 50, overbought : 70, oversold : 30 },
    { date: new Date(20), rsi: 59.14372961624991, middle : 50, overbought : 70, oversold : 30 },
    { date: new Date(21), rsi: 59.832244229918246, middle : 50, overbought : 70, oversold : 30 }
  ]
};