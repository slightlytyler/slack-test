import instantiateComponent from './instantiateComponent';

const render = (element, containerNode) => {
  if (containerNode.firstChild) {
    const instance = containerNode.firstChild._internalInstance;
    instance.receive(element);
    return false;
  }

  const instance = instantiateComponent(element);
  const node = instance.mount();

  node._internalInstance = instance;
  containerNode.appendChild(node);

  return instance.publicInstance;
};

export default render;
