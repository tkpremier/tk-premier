const dsa = require('dsa.js');

/**
 * 
 * @param {array} arr 
 * @param {number} k 
 */

 let count = 0;
const contiguous = (arr = [], k = 0) => {
  const sub = [];
  count++;
  // n = arr.length
  const total = arr.length / k;
  count++;
  if (arr.length < k) {
    return 'array length is not long enough';
  }
  for (let i = 0; i < total; i++) {
    const inner = [];
    for (let j = k * i; j < k + (k * i); j++) {
      inner.push(arr[j]);
    }
    sub.push(inner);
  } 
  return sub;
};

function findXYZ({ start = 0, end = 10 } = {}) {
  const solutions = [];
  for (let x = start; x < end; x++) {
    console.log('x loop: ', x);
    for (let y = start; y < end; y++) {
      console.log('y loop: ', y);
      for (let z = start; z < end; z++) {
        console.log('z loop: ', z);
        if (3 * x + 9 * y + 8 * z === 79) { // eslint-disable-line
          solutions.push({ x, y, z });
        }
      }
    }
  }
  return solutions;
}

const sample = contiguous([9324, 23, 32, 4, 8, 29, 3, 56, 8], 53);

console.log('sample', sample);
console.log('findXYZ', findXYZ({
  end: 6
}));
const el = document.querySelector('#app');


el.append(sample);
