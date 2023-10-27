type Node<T> = {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;
};

function traverseTree(
  currentNode: Node<number> | null,
  needle: number,
): boolean {
  if (!currentNode) {
    return false;
  }
  if (currentNode.value === needle) {
    return true;
  }

  if (currentNode.value > needle) {
    return traverseTree(currentNode.left, needle);
  }
  if (currentNode.value < needle) {
    return traverseTree(currentNode.right, needle);
  }

  return false;
}

export default function DFSOnBST(head: Node<number>, needle: number): boolean {
  return traverseTree(head, needle);
}
