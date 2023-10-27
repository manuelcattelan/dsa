type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default class SinglyLinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  get(nodeIndex: number): T | undefined {
    const [_, currentNode] = this.getNodeAt(nodeIndex);
    return currentNode?.value;
  }
  append(newValue: T): void {
    this.length++;
    const newNode: Node<T> = { value: newValue };

    if (!this.tail) {
      this.tail = this.head = newNode;
      return;
    }

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
    const [previousNode, currentNode] = this.getNodeAt(nodeIndex);

    newNode.next = currentNode;
    if (previousNode) {
      previousNode.next = currentNode;
    }
  }
  removeAt(nodeIndex: number): T | undefined {
    if (nodeIndex < 0 || nodeIndex >= this.length) {
      return undefined;
    }

    const [previousNode, currentNode] = this.getNodeAt(nodeIndex);
    const removedNodeValue = this.removeNode(
      currentNode as Node<T>,
      previousNode,
    );

    return removedNodeValue;
  }
  remove(valueToRemove: T): T | undefined {
    const [previousNode, currentNode] = this.getNode(valueToRemove);

    if (!currentNode) {
      return undefined;
    }
    const removedNodeValue = this.removeNode(currentNode, previousNode);

    return removedNodeValue;
  }

  private getNode(nodeValue: T): (Node<T> | undefined)[] {
    let currentNode = this.head;
    let previousNode: Node<T> | undefined = undefined;
    for (let i = 0; currentNode && i < this.length; ++i) {
      if (currentNode.value === nodeValue) {
        break;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    return [previousNode, currentNode];
  }

  private getNodeAt(nodeIndex: number): (Node<T> | undefined)[] {
    let currentNode = this.head;
    let previousNode: Node<T> | undefined = undefined;
    for (let i = 0; currentNode && i < nodeIndex; ++i) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    return [previousNode, currentNode];
  }

  private removeNode(
    nodeToRemove: Node<T>,
    previousNode: Node<T> | undefined,
  ): T | undefined {
    this.length--;

    if (this.length === 0) {
      const removedNode = this.head;
      this.head = this.tail = undefined;
      return removedNode?.value;
    }

    if (previousNode) {
      previousNode.next = nodeToRemove.next;
    }
    if (nodeToRemove === this.head) {
      this.head = this.head.next;
    }
    if (nodeToRemove === this.tail) {
      this.tail = previousNode;
    }

    nodeToRemove.next = undefined;
    return nodeToRemove.value;
  }
}
