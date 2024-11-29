/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

// - Merge sort: Breaks big arrays into smaller arrays. Eventually breaking a list into length one using RECURSION.
// - BASE CASE: Once you arrive  to a list of length one, the list is sorted
// - Return list of length one and STITCH together in a sorted fashion the two lists coming back
// - STITCH or MERGE is a function that takes two sorted lists and stitch them together.

const mergeSort = (nums) => {
  // base case
  if (nums.length < 2) {
    return nums;
  }

  // split whole array into smaller parts
  const middle = Math.ceil(nums.length / 2);
  const left = nums.slice(0, middle);
  const right = nums.slice(middle);

  // recursive call
  return merge(mergeSort(left), mergeSort(right));
};

function merge(left, right) {
  const arr = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  return arr.concat(left, right);
}

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
