function conquer(
  array: number[],
  lowerBound: number,
  upperBound: number,
): void {
  if (lowerBound >= upperBound) {
    return;
  }

  const pivotIndex = divide(array, lowerBound, upperBound);
  conquer(array, lowerBound, pivotIndex - 1);
  conquer(array, pivotIndex + 1, upperBound);
}
function divide(
  array: number[],
  lowerBound: number,
  upperBound: number,
): number {
  const currentPivot = array[upperBound];

  let newPivotIndex = lowerBound - 1;
  for (let i = lowerBound; i < upperBound; ++i) {
    if (array[i] <= currentPivot) {
      newPivotIndex++;
      const tmp = array[newPivotIndex];
      array[newPivotIndex] = array[i];
      array[i] = tmp;
    }
  }

  newPivotIndex++;
  array[upperBound] = array[newPivotIndex];
  array[newPivotIndex] = currentPivot;

  return newPivotIndex;
}

export default function quickSort(array: number[]): void {
  const lowerBound = 0;
  const upperBound = array.length - 1;
  conquer(array, lowerBound, upperBound);
}
