class Component {
  constructor(props) {
    this.props = props;
  }

  setState(nextState) {
    const instance = this._uiInternalInstance;
    this.state = { ...this.state, ...nextState };
    if (instance) {
      instance.renderedComponent.receive(this.render());
    }
  }
}

Component.prototype.isReactComponent = true;

export default Component;
