const fs = require('fs');
const path = require('path');

const shiftsRegex = /\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/;
const log = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n')
  .filter(str => str.length > 0)
  .map(str => {
      const [, year,month, day, hour, minute, rest] = str.match(shiftsRegex);
      return {
          date: Date.UTC(year, Number(month)-1, day, hour, minute),
          rest
      }
  })
//   .slice(0, 10)
  .sort(({date}) => date.valueOf());

// const {date} = log[0]
// console.log(date.valueOf())
  console.log(log)