import Box from 'components/Box';
import UI, { Component } from 'core/UI';

class Page extends Component {
  render() {
    return (
      <Box
        {...this.props}
        flexDirection={this.props.flexDirection}
      >
        {this.props.children}
      </Box>
    );
  }
}

export default Page;
