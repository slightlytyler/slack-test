const render = container => element => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = '';
  container.appendChild(element);
};

export default render;
