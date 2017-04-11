const kebabCase = str => str
  .replace(/(\B[A-Z])/g, ' $1')
  .replace(/\s|_/g, '-')
  .toLowerCase();

export default kebabCase;
