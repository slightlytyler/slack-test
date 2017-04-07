import kebabCase from 'helpers/string/kebabCase';

const applyChildren = element => children => children.forEach(child => {
  if (Array.isArray(child)) return applyChildren(element)(child);
  return element.appendChild(
    child.nodeType == null
      ? document.createTextNode(child.toString())
      : child,
  );
});

const stringifyStyle = obj => Object.keys(obj).reduce(
  (acc, key) => {
    const spacing = acc ? ' ' : '';
    const next = `${acc}${spacing}${kebabCase(key)}: ${obj[key]};`;
    return next;
  },
  '',
);

const applyAttributes = element => props => Object
  .keys(props)
  .forEach(key => {
    const value = props[key];
    if (value === true) {
      element.setAttribute(key, key);
    } else if (value !== false && value != null) {
      switch (key) {
        case 'className': {
          element.setAttribute('class', value);
          break;
        }

        case 'style': {
          element.setAttribute(key, stringifyStyle(value));
          break;
        }

        default: {
          element.setAttribute(key, value.toString());
          break;
        }
      }
    }
  });

export const createElement = (tag, props, ...children) => {
  if (typeof tag === 'function') {
    return tag({ ...props, children });
  }
  const element = document.createElement(tag);

  if (props) applyAttributes(element)(props);
  applyChildren(element)(children);
  return element;
};

export default createElement;
