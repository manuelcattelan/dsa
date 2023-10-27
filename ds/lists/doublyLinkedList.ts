type Node<T> = {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  get(nodeIndex: number): T | undefined {
    return this.getNodeAt(nodeIndex)?.value;
  }
  append(newValue: T): void {
    this.length++;
    const newNode: Node<T> = { value: newValue };

    if (!this.tail) {
      this.tail = this.head = newNode;
      return;
    }

    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
  }
  prepend(newValue: T): void {
    this.length++;
    const newNode: Node<T> = { value: newValue };

    if (!this.head) {
      this.head = this.tail = newNode;
      return;
    }

    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
  }
  insertAt(newValue: T, nodeIndex: number): void {
    if (nodeIndex < 0 || nodeIndex > this.length) {
      return;
    } else if (nodeIndex === 0) {
      this.prepend(newValue);
      return;
    } else if (nodeIndex === this.length) {
      this.append(newValue);
      return;
    }

    this.length++;

    const newNode: Node<T> = { value: newValue };
    const currentNode = this.getNodeAt(nodeIndex) as Node<T>;

    newNode.next = currentNode;
    newNode.prev = currentNode.prev;
    currentNode.prev = newNode;
    if (currentNode.prev) {
      currentNode.prev.next = newNode;
    }
  }
  removeAt(nodeIndex: number): T | undefined {
    if (nodeIndex < 0 || nodeIndex >= this.length) {
      return undefined;
    }

    const currentNode = this.getNodeAt(nodeIndex) as Node<T>;
    const removedNodeValue = this.removeNode(currentNode);

    return removedNodeValue;
  }
  remove(valueToRemove: T): T | undefined {
    const currentNode = this.getNode(valueToRemove);

    if (!currentNode) {
      return undefined;
    }
    const removedNodeValue = this.removeNode(currentNode);

    return removedNodeValue;
  }

  private getNode(nodeValue: T): Node<T> | undefined {
    let currentNode = this.head;
    for (let i = 0; currentNode && i < this.length; ++i) {
      if (currentNode.value === nodeValue) {
        break;
      }
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  private getNodeAt(nodeIndex: number): Node<T> | undefined {
    let currentNode = this.head;
    for (let i = 0; currentNode && i < nodeIndex; ++i) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  private removeNode(nodeToRemove: Node<T>): T | undefined {
    this.length--;

    if (this.length === 0) {
      const removedNode = this.head;
      this.head = this.tail = undefined;
      return removedNode?.value;
    }

    if (nodeToRemove.next) {
      nodeToRemove.next.prev = nodeToRemove.prev;
    }
    if (nodeToRemove.prev) {
      nodeToRemove.prev.next = nodeToRemove.next;
    }
    if (nodeToRemove === this.head) {
      this.head = this.head.next;
    }
    if (nodeToRemove === this.tail) {
      this.tail = this.tail.prev;
    }

    nodeToRemove.next = nodeToRemove.prev = undefined;
    return nodeToRemove.value;
  }
}
