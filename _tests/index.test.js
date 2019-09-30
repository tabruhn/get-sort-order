const getSortOrder = require('../index');

test('Can sort with basic relationships', () => {
  expect(getSortOrder(['3', '1'])).toEqual(['3', '1']);
  expect(getSortOrder(['bca', 'aaa', 'acb'])).toEqual(['b', 'a', 'c']);
  expect(getSortOrder(['bc', 'ba', 'ca'])).toEqual(['b', 'c', 'a']);
});

test('Duplicate relationships', () => {
  expect(getSortOrder(['za', 'zbc', 'zba',  'cz', 'ca', 'cb'])).toEqual(['z', 'c', 'a', 'b']);
});

test('For differing lengths', () => {
  expect(getSortOrder(['bcab', 'aaaaaab', 'acb', 'c', 'cb'])).toEqual(['b', 'a', 'c']);
});

test('Allows special chars', () => {
  expect(getSortOrder(['.@', ' 1', '@ ', '1' ])).toEqual(['.', ' ', '@', '1']);
});

test('Throw error if no relations', () => {
  expect(() => getSortOrder(['abcdef'])).toThrowError();
});

test('Throw error if invalid relations', () => {
  expect(() => getSortOrder(['ab', 'ba', 'ab'])).toThrowError();
  expect(() => getSortOrder(['ab', 'cd', 'ef'])).toThrowError();
});
