type Node<T> = {
  value: T;
  prev?: Node<T>;
};

export default class Stack<T> {
  public length: number;
  private head?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
  }

  push(newValue: T): void {
    this.length++;
    const newNode: Node<T> = { value: newValue };

    if (!this.head) {
      this.head = newNode;
      return;
    }

    newNode.prev = this.head;
    this.head = newNode;
  }
  pop(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    this.length--;
    const head = this.head;
    this.head = head.prev;
    head.prev = undefined;

    return head.value;
  }
  peek(): T | undefined {
    return this.head?.value;
  }
}
