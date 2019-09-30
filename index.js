/**
 * Returns a new list of characters in the calculated sort order when given an arry of sorted strings.
 *
 * @func pure
 * @since v1.0.0
 * @sig [a] -> [b]
 * @param [Array <Strings>] The array of sorted strings.
 * @return [Array <Chars>] The list of characters in sort order.
 * @example
 *
 *      getSortOrder(['bca', 'aaa', 'acb']); 
 *      //=> ['b', 'a', 'c']
 */

module.exports = function getSortOrder(list) {

  /*
   * Create a map of adjacent relations.
   * @func pure
   * @param [Array <Strings>] An array of sorted strings.
   * @return <Map> Map object with Set values to track known relations between a char and its sorted after values.
   * @example
   *
   *      getSortMap(['bca', 'aaa', 'acb']); 
   *      //=> Map { 
   *        'b' => Set { 'a' },
   *        'c' => Set {},
   *        'a' => Set { 'c' } 
   *      }
   */
  function getSortMap (sortedStrings) {
    // Build a map of values with ordered after relations
    const sortMap = new Map();
    let relations = 0;
    for (const value of new Set(sortedStrings.join(''))) {
      sortMap.set(value, new Set());
    }

    // Read through each string, finding those elements which are ordered after each character
    sortedStrings.reduce((acc, next) => {
      const charLength = acc.length < next.length ? acc.length: next.length;
      for (let i = 0; i < charLength; i++) {
        if (acc[i] !== next[i]) {
          sortMap.get(acc[i]).add(next[i]);
          relations++;
          break;
        }
      }
      return next;
    });
    // If there are no relations or insufficient relations
    if (!(relations >= sortMap.size - 1)) {
       throw new Error('Insufficient information to determine alphabetic order.');
    }
    return sortMap;
  }

  /*
   * Simple DFS algo for an acyclic directed graph.
   * @func pure
   * @param <Map> Map object with Set values to track known relations between a char and its sorted after values.
   * @return [Array <Chars>] The sorted alphabet list.
   * @example
   *
   *      const sortMap = new Map([['3', new Set(['1'])], ['1', new Set()]]); 
   *      getAlphabetOrder(sortMap); 
   *      //=> ['3', '1']
   */
  function getAlphabetOrder (adjMap) {
    const stacked = [];
    const orderedList = [];

    // Use a function stack to arrange chars
    function placeElement(n) {
      const exists = arr => (arr.indexOf(n) !== -1);
      if (exists(stacked)) {
        // If not acyclic
        if(!exists(orderedList)) {
          throw new Error('Insufficient information to determine alphabetic order.');
        }
        return;
      }
      stacked.push(n);
      adjMap.get(n).forEach(placeElement);
      orderedList.unshift(n);
    }

    // For each value in the Map place it in the order where it belongs
    for (const value of adjMap.keys()) {
      placeElement(value);
    }
    return orderedList;
  }

  return getAlphabetOrder(
    getSortMap(list)
  );

}
