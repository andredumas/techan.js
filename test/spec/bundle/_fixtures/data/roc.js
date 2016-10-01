module.exports = {
  input: [
    { date: new Date(2014, 0, 1), close: 22.27 },
    { date: new Date(2014, 0, 2), close: 22.19 },
    { date: new Date(2014, 0, 3), close: 22.08 },
    { date: new Date(2014, 0, 4), close: 22.17 },
    { date: new Date(2014, 0, 5), close: 22.18 },
    { date: new Date(2014, 0, 6), close: 22.13 },
    { date: new Date(2014, 0, 7), close: 22.23 },
    { date: new Date(2014, 0, 8), close: 22.43 },
    { date: new Date(2014, 0, 9), close: 22.24 },
    { date: new Date(2014, 0, 10), close: 22.29 },
    { date: new Date(2014, 0, 11), close: 22.15 },
    { date: new Date(2014, 0, 12), close: 22.39 },
    { date: new Date(2014, 0, 13), close: 22.38 }
  ],
  expected: [
    { date: new Date(2014, 0, 10), value: 0.0008980691513246329 }, // (22.29-22.27)/22.27
    { date: new Date(2014, 0, 11), value: -0.001802613789995615 }, // (22.15-22.19)/22.19
    { date: new Date(2014, 0, 12), value: 0.014039855072463872 },  // (22.39-22.08)/22.08
    { date: new Date(2014, 0, 13), value: 0.009472259810554681 }   // (22.38-22.17)/22.17
  ],
  plot: [
    { date: new Date(9), value: 22.220999999999997 }
  ]
};