const getSortOrder = require('../index');

test(`Basic: '3', '1'`, () => {
  expect(getSortOrder(['3', '1'])).toEqual(['3', '1']);
});

test(`Basic: 'bca', 'aaa', 'acb'`, () => {
  expect(getSortOrder(['bca', 'aaa', 'acb'])).toEqual(['b', 'a', 'c']);
});

test(`Basic: 'bc', 'ba', 'ca'`, () => {
  expect(getSortOrder(['bc', 'ba', 'ca'])).toEqual(['b', 'c', 'a']);
});

test(`Duplicate relationships`, () => {
  expect(getSortOrder(['za', 'zbc', 'zba',  'cz', 'ca', 'cb'])).toEqual(['z', 'c', 'a', 'b']);
});

test(`For differing lengths: 'bcab', 'aaaaaab', 'acb', 'c', 'cb'`, () => {
  expect(getSortOrder(['bcab', 'aaaaaab', 'acb', 'c', 'cb'])).toEqual(['b', 'a', 'c']);
});

test(`Special chars: '.@', ' 1', '@ '`, () => {
  expect(getSortOrder(['.@', ' 1', '@ ', '1' ])).toEqual(['.', ' ', '@', '1']);
});
