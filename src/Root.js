import Header from 'components/Header';
import Page from 'components/Page';
import PhotoStream from 'components/PhotoStream';
import UI, { Component } from 'core/UI';

class Root extends Component {
  render() {
    return (
      <Page>
        <Header />
        <PhotoStream />
      </Page>
    );
  }
}

export default Root;
