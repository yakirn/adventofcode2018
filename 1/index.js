const fs = require('fs');
const path = require('path');

const lines = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n')
  .filter(str => str.length > 0);

  const repeats = lines
  .map(line =>
    line.split('').reduce((map, c) => {
      if (map[c]) {
        map[c]++;
      } else {
        map[c] = 1;
      }
      return map;
    }, {}),
  )
  .map(count => Object.values(count));

  console.log(repeats);
  
let sum = 0;
const set = new Set();
set.add(sum);
let repeatFound = false;
while (!repeatFound) {
  for (const line of lines) {
    sum += Number(line);
    if (set.has(sum)) {
      repeatFound = true;
      break;
    }
    set.add(sum);
  }
}
console.log(sum);