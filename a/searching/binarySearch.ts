export default function binarySearch(
  haystack: number[],
  needle: number,
): boolean {
  let lowerBound = 0;
  let upperBound = haystack.length - 1;

  do {
    const middlePoint = Math.floor(lowerBound + (upperBound - lowerBound) / 2);
    const currentValue = haystack[middlePoint];

    if (currentValue === needle) {
      return true;
    } else if (currentValue > needle) {
      upperBound = middlePoint - 1;
    } else {
      lowerBound = middlePoint + 1;
    }
  } while (lowerBound <= upperBound);

  return false;
}
