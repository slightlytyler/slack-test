const createElement = (type, propsConfig, ...children) => {
  const props = { ...propsConfig, children };
  return { props, type };
};

export default createElement;
