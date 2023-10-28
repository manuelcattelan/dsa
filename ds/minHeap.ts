export default class MinHeap {
  public length: number;
  private data: number[];

  constructor() {
    this.length = 0;
    this.data = [];
  }

  insert(valueToInsert: number): void {
    this.data[this.length] = valueToInsert;
    this.heapifyUp(this.length);
    this.length++;
  }
  delete(): number {
    if (this.length === 0) {
      return -1;
    }

    this.length--;
    const out = this.data[0];
    if (this.length === 0) {
      this.data = [];
      return out;
    }
    this.data[0] = this.data[this.length];
    this.heapifyDown(0);

    return out;
  }

  private getParentIndex(nodeIndex: number): number {
    return Math.floor((nodeIndex - 1) / 2);
  }
  private getLeftChildIndex(nodeIndex: number): number {
    return 2 * nodeIndex + 1;
  }
  private getRightChildIndex(nodeIndex: number): number {
    return 2 * nodeIndex + 2;
  }
  private heapifyUp(currentIndex: number): void {
    if (currentIndex === 0) {
      return;
    }

    const parentIndex = this.getParentIndex(currentIndex);
    const parentValue = this.data[parentIndex];
    const currentValue = this.data[currentIndex];

    if (parentValue > currentValue) {
      this.data[currentIndex] = parentValue;
      this.data[parentIndex] = currentValue;
      this.heapifyUp(parentIndex);
    }
  }
  private heapifyDown(currentIndex: number): void {
    if (currentIndex >= this.length) {
      return;
    }

    const leftChildIndex = this.getLeftChildIndex(currentIndex);
    const rightChildIndex = this.getRightChildIndex(currentIndex);

    if (leftChildIndex >= this.length || rightChildIndex >= this.length) {
      return;
    }

    const currentValue = this.data[currentIndex];
    const leftChildValue = this.data[leftChildIndex];
    const rightChildValue = this.data[rightChildIndex];

    if (leftChildValue > rightChildValue && currentValue > rightChildValue) {
      this.data[currentIndex] = rightChildValue;
      this.data[rightChildIndex] = currentValue;
      this.heapifyDown(rightChildIndex);
    } else if (
      rightChildValue > leftChildValue &&
      currentValue > leftChildValue
    ) {
      this.data[currentIndex] = leftChildValue;
      this.data[leftChildIndex] = currentValue;
      this.heapifyDown(leftChildIndex);
    }
  }
}
