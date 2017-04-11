class Component {
  constructor(props) {
    this.props = props;
  }

  setState(nextStatePartial) {
    const instance = this._uiInternalInstance;
    const nextState = { ...this.state, ...nextStatePartial };
    if (instance) {
      // This is a hack. Sorry slack!
      if (typeof instance.publicInstance.componentWillUpdate === 'function') {
        instance.publicInstance.componentWillUpdate(instance.publicInstance.props, nextState);
      }
      this.state = nextState;
      instance.renderedComponent.receive(this.render());
    }
  }
}

Component.prototype.isReactComponent = true;

export default Component;
