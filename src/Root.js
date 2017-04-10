import DataProvider from 'components/DataProvider';
import Header from 'components/Header';
import Lightbox from 'components/Lightbox';
import Logo from 'components/Logo';
import Page from 'components/Page';
import PhotoStream from 'components/PhotoStream';
import Search from 'components/Search';
import UI, { Component } from 'core/UI';

class Root extends Component {
  render() {
    return (
      <DataProvider>
        {data => (
          <Page>
            <Header>
              <Logo>Resplash</Logo>
              <Search onChange={data.onSearchChange} value={data.search} />
            </Header>
            <PhotoStream onSelectPhoto={data.onSelectPhoto} photos={data.photos} />
            <Lightbox
              onClose={data.onDeselectPhoto}
              onNextPhoto={data.onSelectNextPhoto}
              onPreviousPhoto={data.onSelectPreviousPhoto}
              open={Boolean(data.selectedPhotoId)}
              photo={data.selectedPhoto}
            />
          </Page>
        )}
      </DataProvider>
    );
  }
}

export default Root;
