const checkTextNodeElement = element => (
  typeof element === 'string' || typeof element === 'number'
);

const checkCompositeElement = element => (
  typeof element === 'object' && typeof element.type === 'function'
);

const isReactClass = type => type.prototype && type.prototype.isReactComponent;

/* eslint-disable no-use-before-define */
const instantiateComponent = element => (
  checkCompositeElement(element)
    ? new CompositeComponent(element)
    : new DOMComponent(element)
);
/* eslint-enable no-use-before-define */

class CompositeComponent {
  constructor(element) {
    this.currentElement = element;
    this.renderedComponent = null;
    this.publicInstance = null;
  }

  getPublicInstance() {
    return this.publicInstance;
  }

  getHostNode() {
    return this.renderedComponent.getHostNode();
  }

  receive(nextElement) {
    const { type, props: nextProps } = nextElement;
    const previousComponent = this.renderedComponent;
    const previousRenderedElement = previousComponent.currentElement;
    let nextRenderedElement;

    if (isReactClass(type)) {
      const { componentWillUpdate } = this.publicInstance;
      if (typeof componentWillUpdate === 'function') {
        componentWillUpdate.call(this.publicInstance, this.currentElement.props);
      }

      this.publicInstance.props = nextProps;
      nextRenderedElement = this.publicInstance.render();

      const { componentDidUpdate } = this.publicInstance;
      if (typeof componentDidUpdate === 'function') {
        componentDidUpdate.call(this.publicInstance);
      }
    } else {
      nextRenderedElement = type(nextProps);
    }

    if (nextRenderedElement.type === previousRenderedElement.type) {
      previousComponent.receive(nextRenderedElement);
    } else {
      this.renderedComponent = instantiateComponent(nextRenderedElement);

      const nextHostNode = this.renderedComponent.mount();
      const previousHostNode = previousComponent.getHostNode();

      previousComponent.unmount();
      previousHostNode.parentNode.replaceChild(nextHostNode, previousHostNode);
    }
  }

  mount() {
    const { type, props } = this.currentElement;
    let renderedElement;

    if (isReactClass(type)) {
      // eslint-disable-next-line new-cap
      this.publicInstance = new type(props);
      this.publicInstance._uiInternalInstance = this;

      const { componentWillMount } = this.publicInstance;
      if (typeof componentWillMount === 'function') {
        componentWillMount.call(this.publicInstance);
      }

      renderedElement = this.publicInstance.render();
    } else {
      renderedElement = type(props);
    }

    this.renderedComponent = instantiateComponent(renderedElement);
    const mountedNode = this.renderedComponent.mount();

    if (isReactClass(type)) {
      const { componentDidMount } = this.publicInstance;
      if (typeof componentDidMount === 'function') {
        componentDidMount.call(this.publicInstance);
      }
    }

    return mountedNode;
  }

  unmount() {
    const { type } = this.currentElement;

    if (isReactClass(type)) {
      const { componentWillUnmount } = this.publicInstance;
      if (typeof componentWillUnmount === 'function') {
        componentWillUnmount.call(this.publicInstance);
      }
    }

    this.renderedComponent.unmount();
  }
}

class DOMComponent {
  constructor(element) {
    this.currentElement = element;
    this.node = null;
    this.renderedChildren = [];
  }

  getPublicInstance() {
    return this.node;
  }

  getHostNode() {
    return this.node;
  }

  receive(nextElement) {
    const { props: nextProps } = nextElement;
    const { props: previousProps } = this.currentElement;
    const node = this.node;

    this.currentElement = nextElement;

    Object.keys(previousProps).forEach(prop => {
      if (prop !== 'children' && previousProps.hasOwnProperty(prop)) {
        node.removeAttribute(prop);
      }
    });

    Object.keys(nextProps).forEach(prop => {
      if (prop !== 'children' && previousProps.hasOwnProperty(prop)) {
        node.setAttribute(prop, nextProps[prop]);
      }
    });

    const previousChildrenElements = previousProps.children;
    const nextChildrenElements = nextProps.children;
    const previousRenderedChildren = this.renderedChildren;
    const nextRenderedChildren = [];

    nextChildrenElements.forEach((nextChildElement, index) => {
      const preChildElement = previousChildrenElements[index];
      const needReplace = checkTextNodeElement(preChildElement)
        || (nextChildElement.type !== preChildElement.type);
      if (!preChildElement) {
        const nextChildComponent = instantiateComponent(nextChildElement);
        nextRenderedChildren.push(nextChildComponent);
        node.appendChild(nextChildComponent.mount());
      } else if (needReplace) {
        const nextChildComponent = instantiateComponent(nextChildElement);
        nextRenderedChildren.push(nextChildComponent);
        node.replaceChild(
          nextChildComponent.mount(),
          previousRenderedChildren[index].getHostNode(),
        );
      } else {
        const previousRenderedComponent = previousRenderedChildren[index];
        nextRenderedChildren.push(previousRenderedComponent);
        previousRenderedComponent.receive(nextChildElement);
      }
    });

    previousChildrenElements.forEach((previousChildElement, index) => {
      if (!nextChildrenElements[index]) {
        node.removeChild(previousRenderedChildren[index].getHostNode());
      }
    });

    this.renderedChildren = nextRenderedChildren;
  }

  mount() {
    const element = this.currentElement;
    const isTextNodeElement = checkTextNodeElement(element);
    let node;

    if (isTextNodeElement) {
      node = document.createTextNode(element);
    } else {
      const { type, props: { children, ...attributes } } = element;

      node = document.createElement(type);

      Object.keys(attributes).forEach(k => {
        node.setAttribute(k, attributes[k]);
      });

      children.forEach(child => {
        const childComponent = instantiateComponent(child);
        this.renderedChildren.push(childComponent);
        node.appendChild(childComponent.mount());
      });
    }

    this.node = node;
    return this.node;
  }

  unmount() {
    this.renderedChildren.forEach(childComponent => {
      childComponent.unmount();
    });
  }
}

export default instantiateComponent;
