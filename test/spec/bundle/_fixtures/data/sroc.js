module.exports = {
  input: [
    { date: new Date(0), close: 22.27 },
    { date: new Date(1), close: 22.19 },
    { date: new Date(2), close: 22.08 },
    { date: new Date(3), close: 22.17 },
    { date: new Date(4), close: 22.18 },
    { date: new Date(5), close: 22.13 },
    { date: new Date(6), close: 22.23 },
    { date: new Date(7), close: 22.43 },
    { date: new Date(8), close: 22.24 },
    { date: new Date(9), close: 22.29 },
    { date: new Date(10), close: 22.15 },
    { date: new Date(11), close: 22.39 },
    { date: new Date(12), close: 22.38 }
  ],
  expected: [
    // { date: new Date(0), value: 22.27 },
    // { date: new Date(1), value: 22.23 },
    // { date: new Date(2), value: 22.179999999999996 },
    // { date: new Date(3), value: 22.1775 },
    { date: new Date(4), value: 0.000022545372562229048 }, // (22.177999999999997-22.1775)/22.1775
    { date: new Date(5), value: -0.0007214356569572658 },  // (22.162-22.177999999999997)/22.177999999999997
    { date: new Date(6), value: 0.0010227717113376928 },   // (22.184666666666665-22.162)/22.162
    { date: new Date(7), value: 0.003686229728240695 },    // (22.266444444444442-22.184666666666665)/22.184666666666665
    { date: new Date(8), value: -0.00039587886771994473 }, // (22.257629629629626-22.266444444444442)/22.266444444444442
    { date: new Date(9), value: 0.0004847831344280172 },   // (22.268419753086416-22.257629629629626)/22.257629629629626
    { date: new Date(10), value: -0.0017726112344965484 }, // (22.22894650205761-22.268419753086416)/22.268419753086416
    { date: new Date(11), value: 0.002415071686332991 },   // (22.28263100137174-22.22894650205761)/22.22894650205761
    { date: new Date(12), value: 0.001456575431962651 }    // (22.315087334247828-22.28263100137174)/22.28263100137174
  ],
  plot: [
    { date: new Date(9), value: 22.220999999999997 }
  ]
};