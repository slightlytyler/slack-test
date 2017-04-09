const applyClassName = (str, className) => (str ? `${str} ${className}` : className);

const reduceClassNameConfig = config => Object.keys(config).reduce(
  (acc, key) => (config[key] ? applyClassName(acc, key) : acc),
  '',
);

const cx = (...configs) => configs.reduce(
  (acc, c) => {
    if (typeof c === 'object') {
      return applyClassName(acc, reduceClassNameConfig(c));
    }
    return applyClassName(acc, c);
  },
  '',
);

export default cx;
