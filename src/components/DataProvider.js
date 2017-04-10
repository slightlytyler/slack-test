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

  get selectedPhoto() {
    return this.state.photos.find(p => p.id === this.state.selectedPhotoId);
  }

  get nextPhotoId() {
    const index = this.state.photos.findIndex(p => p.id === this.state.selectedPhotoId) + 1;
    const nextPhoto = this.state.photos[index];
    if (!nextPhoto) return null;
    return nextPhoto.id;
  }

  get previousPhotoId() {
    const index = this.state.photos.findIndex(p => p.id === this.state.selectedPhotoId) - 1;
    const previousPhoto = this.state.photos[index];
    if (!previousPhoto) return null;
    return previousPhoto.id;
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

  render() {
    return this.props.children({
      nextPhotoId: this.nextPhotoId,
      onDeselectPhoto: this.handleDeselectPhoto,
      onSearchChange: this.handleSearchChange,
      onSelectPhoto: this.handleSelectPhoto,
      photos: this.state.photos,
      previousPhotoId: this.previousPhotoId,
      search: this.state.search,
      selectedPhoto: this.selectedPhoto,
      selectedPhotoId: this.state.selectedPhotoId,
    });
  }
}

export default DataProvider;
