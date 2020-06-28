
export const isDescendant = (parent, child) => {
  let descendant = false;
  let node = child.parentNode;
  while (node != null) {
    if (node === parent) {
      descendant = true;
    }
    node = node.parentNode;
  }
  return descendant
}