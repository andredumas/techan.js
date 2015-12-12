module.exports = {
    plot: [
        { date: new Date(2014, 03, 05), up: 90, down:65, oscillator:25, overbought: 70, oversold: 30, middle: 0 },
        { date: new Date(2014, 03, 06), up: 85, down:60, oscillator:25, overbought: 70, oversold: 30, middle: 0 },
        { date: new Date(2014, 03, 07), up: 80, down:55, oscillator:25, overbought: 70, oversold: 30, middle: 0 }
    ],
    input: [
        { date: new Date(0), high: 44.00, low:43.00 },
        { date: new Date(1), high: 44.10, low:43.10 },
        { date: new Date(2), high: 44.20, low:43.20 },
        { date: new Date(3), high: 44.30, low:43.30 },
        { date: new Date(4), high: 44.40, low:43.00 },
        { date: new Date(5), high: 44.50, low:42.90 },
        { date: new Date(6), high: 44.60, low:43.00 },
        { date: new Date(7), high: 44.70, low:43.10 },
        { date: new Date(8), high: 44.80, low:43.20 },
        { date: new Date(9), high: 44.90, low:43.30 },
        { date: new Date(10), high: 45.00, low:43.20 },
        { date: new Date(11), high: 45.10, low:43.10 },
        { date: new Date(12), high: 45.20, low:42.00 },
        { date: new Date(13), high: 45.30, low:42.90 },
        { date: new Date(14), high: 45.40, low:42.80 },
        { date: new Date(15), high: 45.50, low:42.70 },
        { date: new Date(16), high: 45.60, low:42.60 },
        { date: new Date(17), high: 45.70, low:42.50 },
        { date: new Date(18), high: 45.60, low:42.40 },
        { date: new Date(19), high: 45.50, low:42.30 },
        { date: new Date(20), high: 45.40, low:42.20 },
        { date: new Date(21), high: 45.30, low:42.10 },
        { date: new Date(22), high: 45.20, low:42.20 },
        { date: new Date(23), high: 45.10, low:42.30 },
        { date: new Date(24), high: 45.00, low:42.40 },
        { date: new Date(25), high: 44.90, low:42.50 },
        { date: new Date(26), high: 44.80, low:42.60 },
        { date: new Date(27), high: 44.70, low:42.70 }
    ],
    expected: [
        { date: new Date(19), up: 90, down:65, oscillator:25, middle : 0, overbought : 70, oversold : 30 },
        { date: new Date(20), up: 85, down:60, oscillator:25,middle : 0, overbought : 70, oversold : 30 },
        { date: new Date(21), up: 80, down:55.00000000000001, oscillator:24.999999999999993, middle : 0, overbought : 70, oversold : 30 },
        { date: new Date(22), up: 75, down:50, oscillator:25, middle : 0, overbought : 70, oversold : 30 },
        { date: new Date(23), up: 70,down:45, oscillator:25, middle : 0, overbought : 70, oversold : 30 },
        { date: new Date(24), up: 65, down:40, oscillator:25, middle : 0, overbought : 70, oversold : 30 },
        { date: new Date(25), up: 60, down:35, oscillator:25, middle : 0, overbought : 70, oversold : 30 },
        { date: new Date(26), up: 55.00000000000001, down:30, oscillator:25.000000000000007, middle : 0, overbought : 70, oversold : 30 },
        { date: new Date(27), up: 50, down:25, oscillator:25, middle : 0, overbought : 70, oversold : 30 },

    ]
};
