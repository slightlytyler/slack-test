import flatten from 'helpers/array/flatten';

const createElement = (type, propsConfig, ...children) => {
  const flatChildren = flatten(children);
  const props = { ...propsConfig, children: flatChildren };
  return { props, type };
};

export default createElement;
