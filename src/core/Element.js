export const createElement = (tag, props, ...children) => {
  const element = document.createElement(tag);
  children.forEach(child => element.appendChild(
    child.nodeType == null
      ? document.createTextNode(child.toString())
      : child
  ));
  return element;
}

export default {
  createElement,
};
