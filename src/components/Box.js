import UI, { Component } from 'core/UI';

class Box extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Box;
