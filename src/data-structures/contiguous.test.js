const contiguous = require('./contiguous');

test('sub array starts with 4', () => {
  expect(contiguous([3, 5, 4, 2, 1], 2)[0]).toBe(4)
});
