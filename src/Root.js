import DataProvider from 'components/DataProvider';
import Header from 'components/Header';
import Page from 'components/Page';
import PhotoStream from 'components/PhotoStream';
import UI, { Component } from 'core/UI';

class Root extends Component {
  render() {
    return (
      <DataProvider>
        {({ photos, search, onSearchChange }) => (
          <Page>
            <Header onSearchChange={onSearchChange} search={search} />
            <PhotoStream photos={photos} />
          </Page>
        )}
      </DataProvider>
    );
  }
}

export default Root;
