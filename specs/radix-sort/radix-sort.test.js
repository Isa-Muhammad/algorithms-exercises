/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

// helper functions:

function getDigit(number, place, longestNumber) {
  // e.g. number = 1391, place = 0, longestNumber = 4;
  // returns 1

  const string = number.toString();
  // Determine the offset needed to align the number
  const size = string.length;
  const mod = longestNumber - size;
  const adjustedIndex = place - mod;

  // Return the digit at the adjusted index, or undefined if out of bounds
  return string[adjustedIndex] || 0; // Return 0 if the index is out of bounds
}

function findLongestNumber(array) {
  let longest = 0;
  for (let i = 0; i < array.length; i++) {
    const currentLength = array[i].toString().length;
    longest = currentLength > longest ? currentLength : longest;
  }
  return longest;
}

function radixSort(array) {
  // find longest number
  const longestNumber = findLongestNumber(array);

  // create how many buckets needed
  // an array of 10 arrays
  const buckets = new Array(10).fill().map(() => []);

  // for-loop for number of iterations needed (based on longest number)
  for (let i = longestNumber - 1; i >= 0; i--) {
    while (array.length) {
      const current = array.shift();
      // enqueue numbers into buckets
      buckets[getDigit(current, i, longestNumber)].push(current);
    }

    for (let j = 0; j < 10; j++) {
      while (buckets[j].length) {
        // dequeue all of the results
        array.push(buckets[j].shift());
      }
    }
  }

  return array;
}

// unit tests
// do not modify the below code
describe("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
      3000, 3001, 1200, 633,
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
      1200, 1244, 3000, 3001,
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort());
  });
});
