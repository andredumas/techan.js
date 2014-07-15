'use strict';

var ohlc = {};

module.exports = ohlc;

ohlc.alternating = {
  up: { date: new Date("2014-03-05"), open: 1, high: 1.5, low: 0.5, close: 1.1, volume: 10},
  down: { date: new Date("2014-03-06"), open: 1.1, high: 1.5, low: 0.5, close: 1, volume: 100},
  even: { date: new Date("2014-03-07"), open: 1, high: 1.5, low: 0.5, close: 1, volume: 1}
};

ohlc.alternating.array = [ohlc.alternating.up, ohlc.alternating.down, ohlc.alternating.even];

ohlc.invalidvolume = {
  up: { date: new Date("2014-03-05"), open: 1, high: 1.5, low: 0.5, close: 1.1, volume: "not valid"},
  down: { date: new Date("2014-03-06"), open: 1.1, high: 1.5, low: 0.5, close: 1, volume: undefined },
  even: { date: new Date("2014-03-07"), open: 1, high: 1.5, low: 0.5, close: 1, volume: 1}
};

ohlc.invalidvolume.array = [ohlc.invalidvolume.up, ohlc.invalidvolume.down, ohlc.invalidvolume.even];

ohlc.facebook = [
  ["2014-03-07",71.08,71.18,69.47,69.8,38927000],
  ["2014-03-06",71.88,71.89,70.25,70.84,46026500],
  ["2014-03-05",69.69,71.97,69.62,71.57,74567700],
  ["2014-03-04",68.66,68.9,67.62,68.8,42013500],
  ["2014-03-03",66.96,68.05,66.51,67.41,56824100],
  ["2014-02-28",69.47,69.88,67.38,68.46,66783700],
  ["2014-02-27",69.34,70.01,68.87,68.94,41653700],
  ["2014-02-26",70.19,71.22,68.85,69.26,55322700],
  ["2014-02-25",70.95,71,69.45,69.85,52077000],
  ["2014-02-24",68.74,71.44,68.54,70.78,76620300],
  ["2014-02-21",69.69,69.96,68.45,68.59,70932400],
  ["2014-02-20",67.73,70.11,65.73,69.63,130928900],
  ["2014-02-19",67.05,69.08,67,68.06,62087100],
  ["2014-02-18",66.94,67.54,66.07,67.3,43809900],
  ["2014-02-14",67.5,67.58,66.72,67.09,36694900],
  ["2014-02-13",64.18,67.33,64.05,67.33,61911700],
  ["2014-02-12",64.92,65.06,64.05,64.45,47282100],
  ["2014-02-11",63.75,65,63.35,64.85,45675600],
  ["2014-02-10",64.3,64.49,63.47,63.55,43666100],
  ["2014-02-07",62.27,64.57,62.22,64.32,60704300],
  ["2014-02-06",61.46,62.78,61.46,62.16,42086500],
  ["2014-02-05",62.74,63.16,61.27,62.19,51685100],
  ["2014-02-04",62.05,63.14,61.82,62.75,45985500],
  ["2014-02-03",63.03,63.77,60.7,61.48,74866600],
  ["2014-01-31",60.47,63.37,60.17,62.57,87794600],
  ["2014-01-30",62.12,62.5,60.46,61.08,150178900],
  ["2014-01-29",54.61,54.95,53.19,53.53,92995600],
  ["2014-01-28",54.02,55.28,54,55.14,48191200],
  ["2014-01-27",54.73,54.94,51.85,53.55,73924100],
  ["2014-01-24",56.15,56.42,54.4,54.45,55200700],
  ["2014-01-23",56.37,56.68,55.69,56.63,47951800],
  ["2014-01-22",58.85,59.31,57.1,57.51,61352900],
  ["2014-01-21",56.6,58.58,56.5,58.51,48669200],
  ["2014-01-17",57.3,57.82,56.07,56.3,40849200],
  ["2014-01-16",57.26,58.02,56.83,57.19,34541800],
  ["2014-01-15",57.98,58.57,57.27,57.6,33663400],
  ["2014-01-14",56.46,57.78,56.1,57.74,37503600],
  ["2014-01-13",57.91,58.25,55.38,55.91,63010900],
  ["2014-01-10",57.13,58.3,57.06,57.94,42449500],
  ["2014-01-09",58.65,58.96,56.65,57.22,92253300],
  ["2014-01-08",57.6,58.41,57.23,58.23,56682400],
  ["2014-01-07",57.7,58.55,57.22,57.92,77207400],
  ["2014-01-06",54.42,57.26,54.05,57.2,68852600],
  ["2014-01-03",55.02,55.65,54.53,54.56,38246200],
  ["2014-01-02",54.83,55.22,54.19,54.71,43195500],
  ["2013-12-31",54.12,54.86,53.91,54.65,43076200],
  ["2013-12-30",54.93,55.18,53.43,53.71,68307000],
  ["2013-12-27",57.48,57.68,55.25,55.44,60466000],
  ["2013-12-26",58.32,58.38,57.37,57.73,55101000],
  ["2013-12-24",58.27,58.58,56.91,57.96,46617800],
  ["2013-12-23",55.5,58.32,55.45,57.77,98297000],
  ["2013-12-20",54.93,55.15,54.23,55.12,239824000],
  ["2013-12-19",54.33,55.19,53.95,55.05,89825000],
  ["2013-12-18",54.86,55.89,53.75,55.57,76003000],
  ["2013-12-17",54.76,55.18,54.24,54.86,78751000],
  ["2013-12-16",53.25,54.5,52.91,53.81,85119000],
  ["2013-12-13",51.66,53.5,51.34,53.32,82641000],
  ["2013-12-12",51.05,52.07,50.66,51.83,92723000],
  ["2013-12-11",50.55,50.77,49.01,49.38,65776000],
  ["2013-12-10",48.64,50.77,48.54,50.25,68479000],
  ["2013-12-09",48.09,48.97,47.74,48.84,36056000],
  ["2013-12-06",48.98,49.39,47.71,47.94,42938000],
  ["2013-12-05",48.15,48.7,47.87,48.34,43855000],
  ["2013-12-04",46.46,48.77,46.26,48.62,60489500],
  ["2013-12-03",46.75,47.2,46.29,46.73,32086000],
  ["2013-12-02",46.9,47.54,46.26,47.06,50774000],
  ["2013-11-29",46.75,47.21,46.5,47.01,22953900],
  ["2013-11-27",45.97,46.67,45.53,46.49,44993000],
  ["2013-11-26",44.66,46.17,43.55,45.89,82016000],
  ["2013-11-25",46.36,46.65,44.04,44.82,82565000],
  ["2013-11-22",47.04,47.27,45.96,46.23,40545000],
  ["2013-11-21",46.99,47.46,46.69,46.7,34886000],
  ["2013-11-20",46.61,47.55,46.31,46.43,53933000],
  ["2013-11-19",46.26,47,45.72,46.36,75602000],
  ["2013-11-18",48.47,48.84,45.8,45.83,85910000],
  ["2013-11-15",49.11,49.48,48.71,49.01,42453000],
  ["2013-11-14",48.7,49.57,48.03,48.99,75117000],
  ["2013-11-13",46.23,48.74,46.06,48.71,79245000],
  ["2013-11-12",46,47.37,45.83,46.61,68196000],
  ["2013-11-11",47.04,47.53,45.73,46.2,80910000],
  ["2013-11-08",47.81,48.65,47.25,47.53,70731000],
  ["2013-11-07",49.24,49.87,47.3,47.56,97128000],
  ["2013-11-06",50.26,50.45,48.71,49.12,67889000],
  ["2013-11-05",47.79,50.18,47.51,50.11,76835000],
  ["2013-11-04",49.37,49.75,48.02,48.22,80371000],
  ["2013-11-01",50.85,52.09,49.72,49.75,95033000],
  ["2013-10-31",47.16,52,46.5,50.21,248809000],
  ["2013-10-30",50,50.21,48.75,49.01,127073000],
  ["2013-10-29",50.73,50.79,49.25,49.4,102143000],
  ["2013-10-28",51.54,51.7,49.61,50.23,73472000],
  ["2013-10-25",53.18,53.24,51.88,51.95,45085000],
  ["2013-10-24",52.38,52.84,51.59,52.45,46775000],
  ["2013-10-23",51.75,52.25,51.13,51.9,57207000],
  ["2013-10-22",54.33,54.76,52.2,52.68,83204000],
  ["2013-10-21",54.68,54.81,53.51,53.85,58235000],
  ["2013-10-18",54.18,54.83,53.6,54.22,88260000],
  ["2013-10-17",51.12,52.22,50.95,52.21,71522000],
  ["2013-10-16",50.04,51.24,49.9,51.14,64678000],
  ["2013-10-15",49.99,51,49.18,49.5,81167000],
  ["2013-10-14",48.31,49.63,47.91,49.51,68781000],
  ["2013-10-11",49.18,49.87,48.79,49.11,58428000],
  ["2013-10-10",47.87,49.68,47.83,49.05,99774000],
  ["2013-10-09",47.38,47.84,45.26,46.77,147297000],
  ["2013-10-08",50.6,50.6,47.08,47.14,136081000],
  ["2013-10-07",50.73,51.29,50.4,50.52,57204000],
  ["2013-10-04",49.77,51.16,49.57,51.04,74447000],
  ["2013-10-03",50.47,50.72,49.06,49.18,82045000],
  ["2013-10-02",50.13,51.1,49.95,50.28,62834000],
  ["2013-10-01",49.97,51.03,49.45,50.42,98114000],
  ["2013-09-30",50.14,51.6,49.8,50.23,100095000],
  ["2013-09-27",50.29,51.28,49.86,51.24,81410500],
  ["2013-09-26",50.01,50.6,49.5,50.39,98220100],
  ["2013-09-25",49.23,49.54,48.46,49.46,87879700],
  ["2013-09-24",48.51,49.66,48.16,48.45,136716100],
  ["2013-09-23",47.28,47.55,46.29,47.19,75177000],
  ["2013-09-20",46.32,47.6,45.74,47.49,115508400],
  ["2013-09-19",45.51,46.05,45.23,45.98,63972400],
  ["2013-09-18",44.84,45.47,44.4,45.23,79317000],
  ["2013-09-17",42.5,45.44,42.43,45.07,91934600],
  ["2013-09-16",44.85,44.94,42.43,42.51,70424200],
  ["2013-09-13",45.04,45.08,43.93,44.31,52765300],
  ["2013-09-12",45.53,45.62,44.65,44.75,68072300],
  ["2013-09-11",43.39,45.09,43.11,45.04,72328300],
  ["2013-09-10",44.24,44.26,43.23,43.6,54540300],
  ["2013-09-09",44.36,44.79,43.7,44.04,75794700],
  ["2013-09-06",43.09,44.61,42.4,43.95,117535700],
  ["2013-09-05",41.79,42.77,41.77,42.66,50035400],
  ["2013-09-04",42.01,42.17,41.44,41.78,42581900],
  ["2013-09-03",41.84,42.16,41.51,41.87,48774900],
  ["2013-08-30",42.02,42.26,41.06,41.29,67735100],
  ["2013-08-29",40.89,41.78,40.8,41.28,58303400],
  ["2013-08-28",39.96,40.85,39.88,40.55,57918200],
  ["2013-08-27",40.68,41.2,39.42,39.64,72695100],
  ["2013-08-26",40.9,41.94,40.62,41.34,94162400],
  ["2013-08-23",39,40.63,38.93,40.55,86442300],
  ["2013-08-22",38.37,38.75,38.34,38.55,21931200],
  ["2013-08-21",38.38,38.85,38.15,38.32,46116900],
  ["2013-08-20",38.35,38.58,37.69,38.41,57995200],
  ["2013-08-19",37.43,38.28,37.14,37.81,57609600],
  ["2013-08-16",36.97,37.49,36.9,37.08,45840800],
  ["2013-08-15",36.36,37.07,36.02,36.56,56521100],
  ["2013-08-14",36.83,37.55,36.62,36.65,48423900],
  ["2013-08-13",38.24,38.32,36.77,37.02,65379200],
  ["2013-08-12",38.2,38.5,38.1,38.22,31161000],
  ["2013-08-09",38.59,38.74,38.01,38.5,43532300],
  ["2013-08-08",39.13,39.19,38.43,38.54,41301000],
  ["2013-08-07",38.61,38.94,37.7,38.87,68854800],
  ["2013-08-06",39.11,39.25,37.94,38.55,63950800],
  ["2013-08-05",38.43,39.32,38.25,39.19,79994800],
  ["2013-08-02",37.66,38.49,37.5,38.05,73058500],
  ["2013-08-01",37.3,38.29,36.92,37.49,106066500],
  ["2013-07-31",37.96,38.31,36.33,36.8,154828700],
  ["2013-07-30",35.65,37.96,35.32,37.63,173582800],
  ["2013-07-29",34.07,35.63,34.01,35.43,124718800],
  ["2013-07-26",33.77,34.73,33.56,34.01,136028900],
  ["2013-07-25",33.54,34.88,32.75,34.36,365457900],
  ["2013-07-24",26.32,26.53,26.05,26.51,82635600],
  ["2013-07-23",26.1,26.3,25.97,26.13,28221600],
  ["2013-07-22",25.99,26.13,25.72,26.05,27526300],
  ["2013-07-19",25.82,26.11,25.6,25.88,46539700],
  ["2013-07-18",26.75,26.77,26.12,26.18,24806900],
  ["2013-07-17",26.37,26.78,26.3,26.65,21518500],
  ["2013-07-16",26.39,26.75,26.01,26.32,30817600],
  ["2013-07-15",25.93,26.43,25.65,26.28,24234000],
  ["2013-07-12",25.74,25.93,25.55,25.91,16537900],
  ["2013-07-11",25.96,26,25.45,25.81,26777400],
  ["2013-07-10",25.58,25.83,25.47,25.8,26721800],
  ["2013-07-09",25.07,25.49,25.03,25.48,30387900],
  ["2013-07-08",24.47,25.04,24.42,24.71,27064600],
  ["2013-07-05",24.65,24.66,24.2,24.37,20229500],
  ["2013-07-03",24.22,24.71,24.15,24.52,10404400],
  ["2013-07-02",24.7,24.77,24.3,24.41,18394100],
  ["2013-07-01",24.97,25.06,24.62,24.81,20582200],
  ["2013-06-28",24.68,24.98,24.42,24.88,96778900],
  ["2013-06-27",24.24,24.84,24.21,24.66,34694100],
  ["2013-06-26",24.51,24.65,23.99,24.16,29890300],
  ["2013-06-25",24.14,24.43,24.04,24.25,24713200],
  ["2013-06-24",23.95,24.11,23.38,23.94,40626000],
  ["2013-06-21",24.59,24.7,24.05,24.53,45833900],
  ["2013-06-20",24.28,24.75,23.65,23.9,42765600],
  ["2013-06-19",24.2,25.19,24.1,24.31,31790600],
  ["2013-06-18",24.09,24.69,24.08,24.21,36709100],
  ["2013-06-17",23.91,24.25,23.75,24.02,33664500],
  ["2013-06-14",23.56,23.89,23.26,23.63,30677100],
  ["2013-06-13",23.72,23.83,23.27,23.73,31189300],
  ["2013-06-12",24.16,24.26,23.58,23.77,26445800],
  ["2013-06-11",24.03,24.35,24,24.03,29885900],
  ["2013-06-10",24.06,24.6,23.99,24.33,58393000],
  ["2013-06-07",23.03,23.4,22.86,23.29,38699200],
  ["2013-06-06",22.99,23.09,22.67,22.97,31260700],
  ["2013-06-05",23.35,23.71,22.79,22.9,53819700],
  ["2013-06-04",23.89,23.93,23.32,23.52,34760800],
  ["2013-06-03",24.27,24.32,23.71,23.85,35733800],
  ["2013-05-31",24.63,24.95,24.27,24.35,35925000],
  ["2013-05-30",24.13,24.78,23.93,24.55,60733200],
  ["2013-05-29",23.79,23.81,23.26,23.32,64237800],
  ["2013-05-28",24.54,24.54,23.92,24.1,50079700],
  ["2013-05-24",24.97,24.97,24.08,24.31,58727900],
  ["2013-05-23",24.8,25.53,24.77,25.06,37663100],
  ["2013-05-22",25.65,25.85,24.92,25.16,45314500],
  ["2013-05-21",25.87,26.08,25.59,25.66,26261300],
  ["2013-05-20",26.18,26.19,25.69,25.76,42402900],
  ["2013-05-17",26.4,26.6,26.2,26.25,29462700],
  ["2013-05-16",26.48,26.55,25.9,26.13,35499100],
  ["2013-05-15",26.92,26.99,26.4,26.6,30299800],
  ["2013-05-14",26.89,27.28,26.82,27.07,24930300],
  ["2013-05-13",26.6,27.33,26.53,26.82,29068800],
  ["2013-05-10",27.14,27.3,26.57,26.68,30847100],
  ["2013-05-09",27.08,27.55,26.85,27.04,33457200],
  ["2013-05-08",26.88,27.3,26.65,27.12,34654900],
  ["2013-05-07",27.55,27.85,26.85,26.89,41259100],
  ["2013-05-06",28.33,28.46,27.48,27.57,43939400],
  ["2013-05-03",29.04,29.07,28.15,28.31,58506400],
  ["2013-05-02",28.01,29.02,27.98,28.97,104257000],
  ["2013-05-01",27.85,27.92,27.31,27.43,64567600],
  ["2013-04-30",27.13,27.85,27.01,27.77,36245700],
  ["2013-04-29",27.16,27.41,26.86,26.98,29201100],
  ["2013-04-26",26.6,27.62,26.6,26.85,33018000],
  ["2013-04-25",26.07,26.4,26,26.14,17150000],
  ["2013-04-24",25.93,26.4,25.8,26.11,19729900],
  ["2013-04-23",26.22,26.33,25.77,25.98,25191500],
  ["2013-04-22",25.81,26.36,25.7,25.97,25687600],
  ["2013-04-19",25.62,25.96,25.33,25.73,20380900],
  ["2013-04-18",26.82,26.82,25.15,25.69,39059000],
  ["2013-04-17",26.65,27.2,26.39,26.63,26440600],
  ["2013-04-16",26.81,27.11,26.4,26.92,27365900],
  ["2013-04-15",27.16,27.48,26.36,26.52,30275400],
  ["2013-04-12",28,28,27.24,27.4,28697400],
  ["2013-04-11",27.48,28.1,27.25,28.02,33368500],
  ["2013-04-10",27.01,27.84,26.9,27.57,45949400],
  ["2013-04-09",26.58,26.89,26.42,26.59,21311100],
  ["2013-04-08",27.19,27.2,26.63,26.85,27256000],
  ["2013-04-05",26.86,27.8,26.61,27.39,64566600],
  ["2013-04-04",26.62,27.23,26.11,27.07,82016800],
  ["2013-04-03",25.83,26.39,25.7,26.25,48195200],
  ["2013-04-02",25.77,26.12,25.3,25.42,35153300],
  ["2013-04-01",25.63,25.89,25.28,25.53,22249300],
  ["2013-03-28",26.09,26.17,25.52,25.58,28585700],
  ["2013-03-27",25,26.28,24.72,26.09,52297400],
  ["2013-03-26",25.08,25.48,25.03,25.21,26957200],
  ["2013-03-25",25.75,25.8,25.08,25.13,39199000],
  ["2013-03-22",25.8,26.01,25.63,25.73,18456300],
  ["2013-03-21",25.66,26.11,25.56,25.74,24336100],
  ["2013-03-20",26.68,26.69,25.78,25.86,44006500],
  ["2013-03-19",26.53,26.9,26.21,26.55,25254200],
  ["2013-03-18",26.37,26.79,25.78,26.49,26653700],
  ["2013-03-15",27.03,27.06,26.56,26.65,31597400],
  ["2013-03-14",27.1,27.43,26.83,27.04,27646400],
  ["2013-03-13",27.62,27.65,26.92,27.08,39619500],
  ["2013-03-12",28.1,28.32,27.6,27.83,27569600],
  ["2013-03-11",28.01,28.64,27.83,28.14,35642100],
  ["2013-03-08",28.43,28.47,27.73,27.96,44198900],
  ["2013-03-07",27.57,28.68,27.47,28.58,74540200],
  ["2013-03-06",28.1,28.13,27.35,27.45,33532600],
  ["2013-03-05",27.88,28.18,27.21,27.52,40622200],
  ["2013-03-04",27.76,28.06,27.44,27.72,32400700],
  ["2013-03-01",27.05,28.12,26.81,27.78,54064800],
  ["2013-02-28",26.84,27.3,26.34,27.25,83027800],
  ["2013-02-27",27.34,27.34,26.63,26.87,44319700],
  ["2013-02-26",27.36,27.46,26.7,27.39,31611700],
  ["2013-02-25",27.16,27.64,27.15,27.27,34652000],
  ["2013-02-22",27.62,27.63,26.82,27.13,36350200],
  ["2013-02-21",28.28,28.55,27.15,27.28,49642300],
  ["2013-02-20",28.92,29.05,28.33,28.46,42098200],
  ["2013-02-19",28.23,29.08,28.12,28.93,49396400],
  ["2013-02-15",28.52,28.75,28.09,28.32,33109300],
  ["2013-02-14",28.02,28.63,28.01,28.5,35615800],
  ["2013-02-13",27.36,28.32,27.31,27.91,50164000],
  ["2013-02-12",27.67,28.16,27.1,27.37,93447800],
  ["2013-02-11",28.61,28.68,28.04,28.26,37361800],
  ["2013-02-08",28.89,29.17,28.51,28.55,37708800],
  ["2013-02-07",29.11,29.15,28.27,28.65,34540100],
  ["2013-02-06",28.74,29.29,28.66,29.05,38375900],
  ["2013-02-05",28.26,28.96,28.04,28.64,47948200],
  ["2013-02-04",29.06,29.2,28.01,28.11,92362200],
  ["2013-02-01",31.01,31.02,29.63,29.73,85856700],
  ["2013-01-31",29.15,31.47,28.74,30.98,190744900],
  ["2013-01-30",30.98,31.49,30.88,31.24,87682100],
  ["2013-01-29",32,32.07,30.71,30.79,72976500],
  ["2013-01-28",31.88,32.51,31.81,32.47,59682500],
  ["2013-01-25",31.41,31.93,31.13,31.54,54363600],
  ["2013-01-24",31.27,31.49,30.81,31.08,43845100],
  ["2013-01-23",31.1,31.5,30.8,30.82,48899800],
  ["2013-01-22",29.75,30.89,29.74,30.73,55243300],
  ["2013-01-18",30.31,30.44,29.27,29.66,49631500],
  ["2013-01-17",30.08,30.42,30.03,30.14,40256700],
  ["2013-01-16",30.21,30.35,29.53,29.85,75332700],
  ["2013-01-15",30.64,31.71,29.88,30.1,173242600],
  ["2013-01-14",32.08,32.21,30.62,30.95,98892800],
  ["2013-01-11",31.28,31.96,31.1,31.72,89598000],
  ["2013-01-10",30.6,31.45,30.28,31.3,95316400],
  ["2013-01-09",29.67,30.6,29.49,30.59,104787700],
  ["2013-01-08",29.51,29.6,28.86,29.06,45871300],
  ["2013-01-07",28.69,29.79,28.65,29.42,83781800],
  ["2013-01-04",28.01,28.93,27.83,28.76,72715400],
  ["2013-01-03",27.88,28.47,27.59,27.77,63140600],
  ["2013-01-02",27.44,28.18,27.42,28,69846400],
  ["2012-12-31",26.2,26.99,26.11,26.62,60374500],
  ["2012-12-28",25.48,26.11,25.15,25.91,56574800],
  ["2012-12-27",26.55,26.8,25.52,26.05,43481700],
  ["2012-12-26",27.03,27.18,26.38,26.51,33175400],
  ["2012-12-24",26.5,26.96,26.2,26.93,28230100],
  ["2012-12-21",26.66,27.01,26.12,26.26,54555200],
  ["2012-12-20",27.49,27.6,27.13,27.36,35574800],
  ["2012-12-19",27.83,28.22,26.95,27.41,61390300],
  ["2012-12-18",26.96,27.91,26.9,27.71,60512900],
  ["2012-12-17",26.77,27,26.32,26.75,57742500],
  ["2012-12-14",28.18,28.33,26.76,26.81,91631600],
  ["2012-12-13",27.59,28.75,27.43,28.24,81051600],
  ["2012-12-12",28,28.14,27.37,27.58,46704200],
  ["2012-12-11",28.07,28.24,27.66,27.98,77099100],
  ["2012-12-10",27.17,28.17,27.1,27.84,50608500],
  ["2012-12-07",27.07,27.78,26.84,27.49,51751900],
  ["2012-12-06",27.68,27.75,26.82,26.97,46001500],
  ["2012-12-05",27.75,27.9,27.26,27.71,58976300],
  ["2012-12-04",27.06,27.76,26.68,27.46,72869200],
  ["2012-12-03",28,28.88,26.98,27.04,123526100],
  ["2012-11-30",27.26,28,26.76,28,127049600],
  ["2012-11-29",26.5,27.52,26.16,27.32,88759700],
  ["2012-11-28",25.94,26.49,25.75,26.36,49205600],
  ["2012-11-27",26.04,26.5,25.46,26.15,85760600],
  ["2012-11-26",24.94,26.09,24.81,25.94,123865000],
  ["2012-11-23",24.58,24.68,23.88,24,29520900],
  ["2012-11-21",23.22,24.53,23.05,24.32,89862400],
  ["2012-11-20",22.73,23.9,22.7,23.1,46655300],
  ["2012-11-19",23.96,24.12,22.82,22.92,85021300],
  ["2012-11-16",22.25,23.93,22.18,23.56,107182200],
  ["2012-11-15",22.34,22.5,21.65,22.17,78857700],
  ["2012-11-14",20.1,22.5,19.93,22.36,229751000],
  ["2012-11-13",19.61,20.11,19.56,19.86,71775100],
  ["2012-11-12",19.15,20.17,18.87,20.07,67349200],
  ["2012-11-09",19.96,20,19.13,19.21,42295500],
  ["2012-11-08",20.52,20.73,19.98,19.99,34254600],
  ["2012-11-07",20.85,20.95,20.37,20.47,33396800],
  ["2012-11-06",21.24,21.37,20.99,21.17,29062700],
  ["2012-11-05",21.1,21.48,20.92,21.25,31806700],
  ["2012-11-02",21.26,21.69,21.07,21.18,38344400],
  ["2012-11-01",21.08,21.44,21.01,21.21,37713900],
  ["2012-10-31",20.82,21.5,20.73,21.11,99378200],
  ["2012-10-26",22.4,22.88,21.88,21.94,73259600],
  ["2012-10-25",23.29,23.31,22.47,22.56,76142000],
  ["2012-10-24",24.13,24.25,22.85,23.23,228949900],
  ["2012-10-23",19.25,19.8,19.1,19.5,78381200],
  ["2012-10-22",19.2,19.43,19.05,19.32,32447300],
  ["2012-10-19",19,19.06,18.8,19,34835000],
  ["2012-10-18",19.7,19.79,18.89,18.98,52157400],
  ["2012-10-17",19.5,20.48,19.37,19.88,44074500],
  ["2012-10-16",19.68,19.69,19.3,19.48,21834700],
  ["2012-10-15",19.68,19.88,19.49,19.52,20189700],
  ["2012-10-12",19.75,19.8,19.48,19.52,18809400],
  ["2012-10-11",19.88,19.96,19.61,19.75,21817300],
  ["2012-10-10",19.93,19.94,19.45,19.64,39321800],
  ["2012-10-09",20.39,20.55,19.97,20.23,27161800],
  ["2012-10-08",20.4,20.75,20.16,20.4,32236700],
  ["2012-10-05",21.49,21.63,20.88,20.91,40529300],
  ["2012-10-04",22.32,22.4,21.41,21.95,46892100],
  ["2012-10-03",22.3,22.49,21.8,21.83,32000100],
  ["2012-10-02",22.08,22.49,21.82,22.27,29341400],
  ["2012-10-01",22.08,22.59,21.73,21.99,51262700],
  ["2012-09-28",20.57,21.95,20.5,21.66,65486000],
  ["2012-09-27",20.99,21,20.16,20.32,30215900],
  ["2012-09-26",20.15,20.78,19.8,20.62,38271900],
  ["2012-09-25",21.2,21.21,20.22,20.28,46291700],
  ["2012-09-24",21.78,21.98,20.36,20.79,79106500],
  ["2012-09-21",22.97,23.24,22.6,22.86,51218100],
  ["2012-09-20",23.02,23.24,22.54,22.59,57248900],
  ["2012-09-19",21.99,23.37,21.77,23.29,78782800],
  ["2012-09-18",21.6,21.98,21.37,21.87,36760500],
  ["2012-09-17",22.67,22.75,21.5,21.52,50667600],
  ["2012-09-14",21.13,22.08,20.9,22,72819800],
  ["2012-09-13",20.96,21.48,20.61,20.71,65041600],
  ["2012-09-12",20.76,21.16,20.28,20.93,121584000],
  ["2012-09-11",18.92,19.58,18.85,19.43,50508200],
  ["2012-09-10",19.06,19.2,18.55,18.81,24797800],
  ["2012-09-07",19.1,19.42,18.78,18.98,36371700],
  ["2012-09-06",18.74,19.26,18.72,18.96,46066500],
  ["2012-09-05",18.27,18.75,18.18,18.58,60781800],
  ["2012-09-04",18.08,18.27,17.55,17.73,46622400],
  ["2012-08-31",18.68,18.7,18.03,18.06,58764200],
  ["2012-08-30",19.27,19.45,19.06,19.09,30647500],
  ["2012-08-29",19.32,19.38,19.07,19.1,16124700],
  ["2012-08-28",19.1,19.38,18.95,19.34,25417000],
  ["2012-08-27",19.49,19.53,19.1,19.15,20704000],
  ["2012-08-24",19.52,19.68,19.25,19.41,29622200],
  ["2012-08-23",19.5,19.73,19.36,19.44,32813700],
  ["2012-08-22",19.36,19.53,18.96,19.44,49892200],
  ["2012-08-21",19.58,19.98,19.09,19.16,70640600],
  ["2012-08-20",19.05,20.13,18.75,20.01,101186600],
  ["2012-08-17",20.01,20.08,19,19.05,129293400],
  ["2012-08-16",20.44,20.48,19.69,19.87,157565300],
  ["2012-08-15",20.64,21.41,20.4,21.2,47861100],
  ["2012-08-14",21.41,21.6,20.25,20.38,39308800],
  ["2012-08-13",22.15,22.45,21.4,21.6,24973100],
  ["2012-08-10",21.41,21.82,21.13,21.81,25794700],
  ["2012-08-09",20.75,21.17,20.61,21.01,15610700],
  ["2012-08-08",20.71,21.15,20.22,20.72,29537400],
  ["2012-08-07",22.2,22.45,20.5,20.72,36782900],
  ["2012-08-06",21.39,22.15,21.3,21.92,27778900],
  ["2012-08-03",20.36,22.16,19.9,21.09,80647000],
  ["2012-08-02",20.77,20.84,19.82,20.04,56374500],
  ["2012-08-01",21.5,21.58,20.84,20.88,44604400],
  ["2012-07-31",23.37,23.37,21.61,21.71,56179400],
  ["2012-07-30",24,24.04,23.03,23.15,29285900],
  ["2012-07-27",23.19,24.54,22.28,23.71,123102300],
  ["2012-07-26",27.75,28.23,26.73,26.85,64597400],
  ["2012-07-25",28.39,29.49,28.08,29.34,17230200],
  ["2012-07-24",28.82,29.45,28.1,28.45,11539800],
  ["2012-07-23",28.12,29,28.01,28.75,12390700],
  ["2012-07-20",29,29.47,28.72,28.76,11869100],
  ["2012-07-19",29.41,29.5,28.63,29,13685100],
  ["2012-07-18",28.31,29.29,28.15,29.11,16841800],
  ["2012-07-17",28.48,28.59,27.15,28.09,30438600],
  ["2012-07-16",30.5,30.5,28.21,28.25,24672100],
  ["2012-07-13",31.04,31.07,30.56,30.72,8108300],
  ["2012-07-12",30.7,31.4,30.6,30.81,11300700],
  ["2012-07-11",31.48,31.56,30.55,30.97,13030300],
  ["2012-07-10",32.43,32.48,31.16,31.47,14269500],
  ["2012-07-09",32.1,32.88,31.99,32.17,17785200],
  ["2012-07-06",31.44,31.9,31.26,31.73,10945600],
  ["2012-07-05",31.32,31.63,31.02,31.47,10032100],
  ["2012-07-03",30.91,31.44,30.8,31.2,8763600],
  ["2012-07-02",31.25,31.73,30.55,30.77,14122000],
  ["2012-06-29",31.92,31.99,30.76,31.1,19526900],
  ["2012-06-28",31.96,32.19,30.9,31.36,17713300],
  ["2012-06-27",32.46,32.9,31.9,32.23,28568000],
  ["2012-06-26",32.69,33.44,32.5,33.1,24858700],
  ["2012-06-25",32.86,33.02,31.55,32.06,24352900],
  ["2012-06-22",32.41,33.45,32.06,33.05,74834000],
  ["2012-06-21",31.67,32.5,31.51,31.84,21875300],
  ["2012-06-20",31.92,31.93,31.15,31.6,15553600],
  ["2012-06-19",31.54,32.18,30.7,31.91,30849000],
  ["2012-06-18",29.96,32.08,29.41,31.41,42978900],
  ["2012-06-15",28.51,30.1,28.35,30.01,43563800],
  ["2012-06-14",27.65,28.32,27.38,28.29,16855000],
  ["2012-06-13",27.66,28.1,27.1,27.27,17102800],
  ["2012-06-12",27.48,27.77,26.96,27.4,15816800],
  ["2012-06-11",27.18,28.07,26.84,27.01,28219600],
  ["2012-06-08",26.55,27.76,26.44,27.1,38034000],
  ["2012-06-07",27,27.35,26.15,26.31,26159500],
  ["2012-06-06",26.07,27.17,25.52,26.81,61489200],
  ["2012-06-05",26.7,27.76,25.75,25.87,42473400],
  ["2012-06-04",27.2,27.65,26.44,26.9,35230300],
  ["2012-06-01",28.89,29.15,27.39,27.72,41855500],
  ["2012-05-31",28.55,29.67,26.83,29.6,111639200],
  ["2012-05-30",28.7,29.55,27.86,28.19,57267900],
  ["2012-05-29",31.48,31.69,28.65,28.84,78063400],
  ["2012-05-25",32.9,32.95,31.11,31.91,37149800],
  ["2012-05-24",32.95,33.21,31.77,33.03,50237200],
  ["2012-05-23",31.37,32.5,31.36,32,73600000],
  ["2012-05-22",32.61,33.59,30.94,31,101786600],
  ["2012-05-21",36.53,36.66,33,34.03,168192700],
  ["2012-05-18",42.05,45,38,38.23,573576400]
].map(function(d) {
    var date = new Date(d[0]);
    date.setHours(0,0,0,0);
    return {
      date: date,
      open: d[0],
      high: d[1],
      low: d[2],
      close: d[3],
      volume: d[4]
    };
  }).sort(function(a, b) {
    return d3.ascending(a.date, b.date);
  });