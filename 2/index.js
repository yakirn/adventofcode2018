const fs = require('fs');
const path = require('path');

const lines = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n')
  .filter(str => str.length > 0);

let match;

for (const l1 of lines) {
  const diff1 = lines.filter(l2 => hamming_distance(l1, l2) === 1);
  if (diff1.length === 1) {
    match = [l1, diff1[0]];
    break;
  }
}
const [l1, l2] = match;
const res = l1.split('').reduce((str, c, i) => {
  if (c === l2[i]) return str + c;
  return str;
}, '');

console.log(res);

function hamming_distance(x, y) {
  return x.split('').reduce((acc, c, i) => {
    if (c !== y[i]) acc++;

    return acc;
  }, 0);
}


