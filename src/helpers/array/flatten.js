const flatten = array => array.reduce(
  (acc, el) => {
    if (Array.isArray(el)) return acc.concat(el);
    acc.push(el);
    return acc;
  },
  [],
);

export default flatten;
