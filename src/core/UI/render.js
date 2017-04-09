import instantiateComponent from './instantiateComponent';

const render = (element, container) => {
  if (container.firstChild) {
    const instance = container.firstChild._internalInstance;
    instance.receive(element);
    return false;
  }

  const instance = instantiateComponent(element);
  const node = instance.mount();

  node._internalInstance = instance;
  container.appendChild(node);

  return instance.publicInstance;
};

export default render;
