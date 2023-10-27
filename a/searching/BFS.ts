type Node<T> = {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;
};

export default function BFSOnBST(head: Node<number>, needle: number): boolean {
  const searchQueue = [head];

  while (searchQueue.length) {
    const currentNode = searchQueue.shift() as Node<number>;

    if (currentNode.value === needle) {
      return true;
    }
    if (currentNode.left) {
      searchQueue.push(currentNode.left);
    }
    if (currentNode.right) {
      searchQueue.push(currentNode.right);
    }
  }

  return false;
}
