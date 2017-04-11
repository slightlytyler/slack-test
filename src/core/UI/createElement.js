const createElement = (type, propsConfig, ...children) => {
  const props = { ...propsConfig };

  if (children.length === 1) props.children = children[0];
  else props.children = children;

  return { type, props };
};

export default createElement;
