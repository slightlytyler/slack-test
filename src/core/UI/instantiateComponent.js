import kebabCase from 'helpers/kebabCase';

const isCompositeElement = element => (
  typeof element === 'object' && typeof element.type === 'function'
);

const isTextElement = element => (
  typeof element === 'string' || typeof element === 'number'
);

const diffElements = (previousElement, nextElement) => (
  (previousElement && nextElement)
  && (previousElement.type !== nextElement.type)
);

const eqElements = (previousElement, nextElement) => (
  (previousElement && nextElement)
  && (previousElement.type === nextElement.type)
);

const appendStyle = (str, style) => (str ? `${str} ${style}` : style);

const computeStyle = styleConfig => Object.entries(styleConfig).reduce(
  (acc, [key, value]) => appendStyle(acc, `${kebabCase(key)}: ${value};`),
  '',
);

const setAttributes = (node, props) => Object.entries(props).forEach(([key, value]) => {
  if (key !== 'children') {
    switch (key) {
      case 'onChange': {
        node.addEventListener('input', value);
        break;
      }

      case 'onClick': {
        node.addEventListener('click', value);
        break;
      }

      case 'className': {
        node.setAttribute('class', value);
        break;
      }

      case 'style': {
        node.setAttribute('style', computeStyle(value));
        break;
      }

      default: {
        node.setAttribute(key, value);
        break;
      }
    }
  }
});

const removeAttributes = (node, props) => Object.entries(props).forEach(([key, value]) => {
  if (key !== 'children') {
    switch (key) {
      case 'onChange': {
        node.removeEventListener('input', value);
        break;
      }

      case 'onClick': {
        node.removeEventListener('click', value);
        break;
      }

      default: {
        node.removeAttribute(key);
        break;
      }
    }
  }
});

const isUIClass = type => type.prototype && type.prototype.isUIComponent;

/* eslint-disable no-use-before-define */
const instantiateComponent = element => (
  isCompositeElement(element)
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

    if (isUIClass(type)) {
      this.publicInstance.props = nextProps;
      nextRenderedElement = this.publicInstance.render();
    } else {
      nextRenderedElement = type(nextProps);
    }

    if (eqElements(previousRenderedElement, nextRenderedElement)) {
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

    if (isUIClass(type)) {
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

    if (isUIClass(type)) {
      const { componentDidMount } = this.publicInstance;
      if (typeof componentDidMount === 'function') {
        componentDidMount.call(this.publicInstance);
      }
    }

    return mountedNode;
  }

  unmount() {
    const { type } = this.currentElement;

    if (isUIClass(type)) {
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
    removeAttributes(node, previousProps);
    setAttributes(node, nextProps);

    const previousChildrenElements = previousProps.children;
    const nextChildrenElements = nextProps.children;
    const previousRenderedChildren = this.renderedChildren;
    const nextRenderedChildren = [];

    if (Array.isArray(nextChildrenElements)) {
      nextChildrenElements.forEach((nextChildElement, index) => {
        const previousChildElement = previousChildrenElements[index];
        const needReplace = isTextElement(previousChildElement)
          || diffElements(previousChildElement, nextChildElement);

        if (typeof previousChildElement === 'undefined') {
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
    }

    if (Array.isArray(previousChildrenElements)) {
      previousChildrenElements.forEach((previousChildElement, index) => {
        if (!nextChildrenElements[index]) {
          node.removeChild(previousRenderedChildren[index].getHostNode());
        }
      });
    }

    this.renderedChildren = nextRenderedChildren;
  }

  mount() {
    const element = this.currentElement;
    const isTextNodeElement = isTextElement(element);
    let node;

    if (isTextNodeElement) {
      node = document.createTextNode(element);
    } else {
      const { type, props: { children, ...attributes } } = element;

      node = document.createElement(type);
      setAttributes(node, attributes);

      if (Array.isArray(children)) {
        children.forEach(child => {
          const childComponent = instantiateComponent(child);
          this.renderedChildren.push(childComponent);
          node.appendChild(childComponent.mount());
        });
      } else {
        const childComponent = instantiateComponent(children);
        this.renderedChildren.push(childComponent);
        node.appendChild(childComponent.mount());
      }
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
