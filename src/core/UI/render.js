import instantiateComponent from './instantiateComponent';

const render = (element, container) => {
  const instance = instantiateComponent(element);
  const node = instance.mount();

  node._internalInstance = instance;
  container.appendChild(node);

  return instance.publicInstance;
};

export default render;
