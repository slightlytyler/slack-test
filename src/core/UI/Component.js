class Component {
  constructor(props) {
    this.props = props;
  }

  setState(nextStatePartial) {
    const internalInstance = this._uiInternalInstance;
    const nextState = { ...this.state, ...nextStatePartial };

    if (internalInstance) {
      // This is a hack. Sorry slack!
      // Real lifecycles are more complicated than anticipated
      if (typeof this.componentWillUpdate === 'function') {
        this.componentWillUpdate(this.props, nextState);
      }

      this.state = nextState;
      internalInstance.renderedComponent.receive(this.render());

      if (typeof this.componentDidUpdate === 'function') {
        this.componentDidUpdate();
      }
    }
  }
}

Component.prototype.isUIComponent = true;

export default Component;
