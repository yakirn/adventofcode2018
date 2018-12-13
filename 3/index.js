const fs = require('fs');
const path = require('path');

const claimRegex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
const claims = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n')
  .filter(str => str.length > 0)
  .map(line => line.match(claimRegex))
  .map(([, id, offsetLeft, offsetTop, width, length]) => ({
      id,
      offsetLeft: Number(offsetLeft),
      offsetTop: Number(offsetTop),
      width: Number(width),
      length: Number(length)
    })
  );

  const {maxWidth, maxLength} = claims.map(({offsetLeft, offsetTop, width, length}) => ({width: offsetLeft + width, length: offsetTop + length}))
  .reduce(({maxWidth, maxLength}, {width, length}) => {
    return {
        maxWidth: Math.max(maxWidth, width),
        maxLength: Math.max(maxLength, length)
    }
  }, {maxWidth: 0, maxLength: 0})

  const fabric = [];

  for (let y = 0; y < maxLength+10; y++) {
    const row = [];
    fabric.push(row);
    for (let x = 0; x < maxWidth+10; x++) {
      row.push(0);
    }
  }

  claims.forEach(({offsetLeft, offsetTop, width, length}) => {
    for (let y = 0; y < length; y++) {
      for (let x = 0; x < width; x++) {
        fabric[offsetTop+y][offsetLeft+x]++;
      }
    }
  });

  const overlapCount = fabric.reduce((overlapCount, row) => overlapCount + row.filter(c => c > 1).length, 0);

  console.log(overlapCount);

  console.log('====================== Day 2 ======================');
  
  const nonIntersecting = claims.map(claim => {
    const intersections = claims.filter(c => !(
    claim.offsetLeft > c.offsetLeft + c.width ||
    claim.offsetLeft + claim.width < c.offsetLeft ||
    claim.offsetTop > c.offsetTop + c.length ||
    claim.offsetTop + claim.length < c.offsetTop
    )).length
    return {
      id: claim.id,
      intersections
    }
  })
  // .slice(0, 5)
  .filter(claim => claim.intersections <= 1);

  console.log(nonIntersecting);