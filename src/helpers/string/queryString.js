const reduceParams = params => Object.keys(params).reduce(
  (acc, key) => {
    const q = `${key}=${params[key]}`;
    return acc ? `${acc}&${q}` : q;
  },
  '',
);

const queryString = (params = {}) => (
  Object.keys(params).length ? `?${reduceParams(params)}` : ''
);

export default queryString;
