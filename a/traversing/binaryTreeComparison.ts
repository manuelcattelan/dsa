type Node<T> = {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;
};

function traverseTree(
  currentNodeA: Node<number> | null,
  currentNodeB: Node<number> | null,
): boolean {
  if (currentNodeA === null && currentNodeB === null) {
    return true;
  }
  if (currentNodeA === null || currentNodeB === null) {
    return false;
  }
  if (currentNodeA.value !== currentNodeB.value) {
    return false;
  }

  return (
    traverseTree(currentNodeA.left, currentNodeB.left) &&
    traverseTree(currentNodeA.right, currentNodeB.right)
  );
}

export default function binaryTreeComparison(
  headA: Node<number> | null,
  headB: Node<number> | null,
): boolean {
  return traverseTree(headA, headB);
}
