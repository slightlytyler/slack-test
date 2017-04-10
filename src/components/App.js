import DataProvider from 'components/DataProvider';
import Header from 'components/Header';
import Lightbox from 'components/Lightbox';
import Logo from 'components/Logo';
import Page from 'components/Page';
import PhotoStream from 'components/PhotoStream';
import Search from 'components/Search';
import UI, { Component } from 'core/UI';

class App extends Component {
  render() {
    return (
      <DataProvider>
        {data => (
          <Page>
            <Header>
              <Logo>Resplash</Logo>
              <Search loading={data.loading} onChange={data.onSearchChange} value={data.search} />
            </Header>
            <PhotoStream onSelectPhoto={data.onSelectPhoto} photos={data.photos} />
            <Lightbox
              nextPhotoId={data.nextPhotoId}
              onClose={data.onDeselectPhoto}
              onSelectPhoto={data.onSelectPhoto}
              open={Boolean(data.selectedPhotoId)}
              photo={data.selectedPhoto}
              previousPhotoId={data.previousPhotoId}
            />
          </Page>
        )}
      </DataProvider>
    );
  }
}

export default App;
