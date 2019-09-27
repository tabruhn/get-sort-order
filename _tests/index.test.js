const index = require('../index');

const getDictionary = index.getDictionary;

test(`Basic: '3', '1'`, () => {
  expect(getDictionary(['3', '1'])).toEqual(['3', '1']);
});

test(`Basic: 'bca', 'aaa', 'acb'`, () => {
  expect(getDictionary(['bca', 'aaa', 'acb'])).toEqual(['b', 'a', 'c']);
});

test(`Basic: 'bc', 'ba', 'ca'`, () => {
  expect(getDictionary(['bc', 'ba', 'ca'])).toEqual(['b', 'c', 'a']);
});

test(`Duplicate relationships`, () => {
  expect(getDictionary(['za', 'zbc', 'zba',  'cz', 'ca', 'cb'])).toEqual(['z', 'c', 'a', 'b']);
});

test(`For differing lengths: 'bcab', 'aaaaaab', 'acb', 'c', 'cb'`, () => {
  expect(getDictionary(['bcab', 'aaaaaab', 'acb', 'c', 'cb'])).toEqual(['b', 'a', 'c']);
});

test(`Special chars: '.@', ' 1', '@ '`, () => {
  expect(getDictionary(['.@', ' 1', '@ ', '1' ])).toEqual(['.', ' ', '@', '1']);
});
