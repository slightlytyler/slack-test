import UI, { Component } from 'core/UI';
// import { API_URL, AUTHORIZATION_TOKEN } from 'src/env';
import photosJson from 'src/mocks/photos.json';

class DataProvider extends Component {
  state = {
    photos: [],
    search: '',
    selectedPhotoId: null,
  }

  componentDidMount() {
    this.fetchPhotos().then(photos => this.setState({ photos }));
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.search !== nextState.search) {
      this.fetchPhotos(nextState.search).then(photos => this.setState({ photos }));
    }
  }

  // fetchPhotos = () => window
  //   .fetch(`${API_URL}/photos`, {
  //     headers: new Headers({
  //       Authorization: AUTHORIZATION_TOKEN,
  //     }),
  //   })
  //   .then(response => response.json());

  fetchPhotos = () => Promise.resolve(photosJson);

  handleSearchChange = search => this.setState({ search });

  handleSelectPhoto = photoId => this.setState({ selectedPhotoId: photoId });

  handleDeselectPhoto = () => this.setState({ selectedPhotoId: null });

  // eslint-disable-next-line no-console
  handleSelectNextPhoto = () => console.log('next photo');

  // eslint-disable-next-line no-console
  handleSelectPreviousPhoto = () => console.log('previous photo');

  get selectedPhoto() {
    return this.state.photos.find(p => p.id === this.state.selectedPhotoId);
  }

  render() {
    return this.props.children({
      photos: this.state.photos,
      search: this.state.search,
      selectedPhoto: this.selectedPhoto,
      selectedPhotoId: this.state.selectedPhotoId,
      onDeselectPhoto: this.handleDeselectPhoto,
      onSearchChange: this.handleSearchChange,
      onSelectNextPhoto: this.handleSelectNextPhoto,
      onSelectPhoto: this.handleSelectPhoto,
      onSelectPreviousPhoto: this.handleSelectPreviousPhoto,
    });
  }
}

export default DataProvider;
