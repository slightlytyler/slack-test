import DataProvider from 'components/DataProvider';
import Header from 'components/Header';
import Logo from 'components/Logo';
import Page from 'components/Page';
import PhotoStream from 'components/PhotoStream';
import Search from 'components/Search';
import UI, { Component } from 'core/UI';

class Root extends Component {
  render() {
    return (
      <DataProvider>
        {({ photos, search, onSearchChange }) => (
          <Page>
            <Header>
              <Logo>Resplash</Logo>
              <Search onChange={onSearchChange} value={search} />
            </Header>
            <PhotoStream photos={photos} />
          </Page>
        )}
      </DataProvider>
    );
  }
}

export default Root;
