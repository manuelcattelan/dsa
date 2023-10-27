type Node<T> = {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;
};

function traverseTree(
  currentNode: Node<number> | null,
  path: number[],
): number[] {
  if (!currentNode) {
    return path;
  }

  path.push(currentNode.value);
  traverseTree(currentNode.left, path);
  traverseTree(currentNode.right, path);

  return path;
}

export function binaryTreePreOrder(head: Node<number>): number[] {
  const path: number[] = [];
  return traverseTree(head, path);
}
