/**
 * Returns a new list of characters in the calculated sort order when given an arry of sorted strings.
 *
 * @func
 * @since v1.0.0
 * @sig [a] -> [b]
 * @param {Array} The array of sorted strings.
 * @return {Array} The list of characters in sort order.
 * @example
 *
 *      getSortOrder(['bca', 'aaa', 'acb']); 
 *      //=> ['b', 'a', 'c']
 */

module.exports = function getSortOrder(lists) {
  // Build a map of values with ordered after relations
  const sortMap = new Map();
  for (const value of new Set(lists.join(''))) {
    sortMap.set(value, new Set());
  }

  // Read through each string, finding those elements which are ordered after each character
  lists.reduce((acc, next) => {
    const charLength = acc.length < next.length ? acc.length: next.length;
    for (let i = 0; i < charLength; i++) {
      if (acc[i] !== next[i]) {
        sortMap.get(acc[i]).add(next[i]);
        break;
      }
    }
    return next;
  });

  const stacked = [];
  const orderedList = [];

  // Use a function stack to build the
  function placeElement(n) {
    if (stacked.indexOf(n) !== -1) return;
    stacked.push(n);
    sortMap.get(n).forEach(placeElement);
    orderedList.unshift(n);
  }
  
  // for each value in our Map place it in the order where it belongs
  for (const value of sortMap.keys()) {
    placeElement(value);
  }

  return orderedList;
}
