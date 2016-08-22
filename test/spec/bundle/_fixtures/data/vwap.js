module.exports = {
  input: [
    { date: new Date(2015, 1, 1, 9, 30), high: 22.27, low: 22.17, close: 22.25, volume: 1000 },
    { date: new Date(2015, 1, 1, 9, 31), high: 22.31, low: 22.30, close: 22.30, volume: 1200 },
    { date: new Date(2015, 1, 1, 9, 32), high: 22.30, low: 22.29, close: 22.32, volume: 900 },
    { date: new Date(2015, 1, 1, 9, 33), high: 22.39, low: 22.34, close: 22.38, volume: 2000 },
    { date: new Date(2015, 1, 1, 9, 34), high: 22.45, low: 22.39, close: 22.39, volume: 2100 },

    { date: new Date(2015, 1, 2, 9, 30), high: 23.01, low: 22.99, close: 23.09, volume: 3000 },
    { date: new Date(2015, 1, 2, 9, 31), high: 23.09, low: 23.08, close: 23.08, volume: 3100 },
    { date: new Date(2015, 1, 2, 9, 32), high: 23.21, low: 23.17, close: 23.20, volume: 4000 },
    { date: new Date(2015, 1, 2, 9, 33), high: 23.39, low: 23.31, close: 23.35, volume: 4200 },
    { date: new Date(2015, 1, 2, 9, 34), high: 24.31, low: 24.01, close: 24.38, volume: 4000 },
  ],
  expected: {
    vwap: [
      { date: new Date(2015, 1, 1, 9, 30), value: 22.23 },
      { date: new Date(2015, 1, 1, 9, 31), value: 22.27 },
      { date: new Date(2015, 1, 1, 9, 32), value: 22.27967741935484 },
      { date: new Date(2015, 1, 1, 9, 33), value: 22.315098039215687 },
      { date: new Date(2015, 1, 1, 9, 34), value: 22.342777777777776 },

      { date: new Date(2015, 1, 2, 9, 30), value: 23.03 },
      { date: new Date(2015, 1, 2, 9, 31), value: 23.057103825136608 },
      { date: new Date(2015, 1, 2, 9, 32), value: 23.111056105610558 },
      { date: new Date(2015, 1, 2, 9, 33), value: 23.18123543123543 },
      { date: new Date(2015, 1, 2, 9, 34), value: 23.411202185792348 },
    ],
  }
};
