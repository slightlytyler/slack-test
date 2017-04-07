const handleChildren = element => children => children.forEach(child => {
  if (Array.isArray(child)) return handleChildren(element)(child);
  return element.appendChild(
    child.nodeType == null
      ? document.createTextNode(child.toString())
      : child
  );
});

export const createElement = (tag, props, ...children) => {
  if (typeof tag === 'function') {
    return tag({ ...props, children });
  }
  const element = document.createElement(tag);
  if (props) {
    Object.keys(props).forEach(key => {
      let value = props[key];
      if (value === true) {
        element.setAttribute(key, key);
      } else if (value !== false && value != null) {
        element.setAttribute(key, value.toString());
      }
    });
  }
  handleChildren(element)(children);
  return element;
};

export default {
  createElement,
};
