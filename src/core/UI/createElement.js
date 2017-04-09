import flatten from 'helpers/array/flatten';

const createElement = (type, propsConfig, ...children) => {
  const flatChildren = flatten(children);
  // if (flatChildren.length === 1) {
  //   const props = { ...propsConfig, children: flatChildren[0] };
  //   return { props, type };
  // }
  const props = { ...propsConfig, children: flatChildren };
  return { props, type };
};

export default createElement;
