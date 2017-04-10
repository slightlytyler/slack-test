import UI, { Component } from 'core/UI';
import queryString from 'helpers/string/queryString';
import { API_URL, AUTHORIZATION_TOKEN } from 'src/env';

class DataProvider extends Component {
  state = {
    loading: false,
    photos: [],
    search: '',
    selectedPhotoId: null,
  }

  componentDidMount() {
    this.fetchPhotos().then(photos => this.setState({ photos }));
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.search !== nextState.search) {
      if (this.searchTimeout) clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(
        () => {
          this.setState({ loading: true });
          this.fetchPhotos(nextState.search).then(photos => (
            this.setState({ loading: false, photos })
          ));
        },
        500,
      );
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

  fetchPhotos = query => {
    const params = { per_page: 18 };

    if (query) {
      params.query = query;
      return window
        .fetch(`${API_URL}/search/photos${queryString(params)}`, {
          headers: new Headers({
            Authorization: AUTHORIZATION_TOKEN,
          }),
        })
        .then(response => response.json())
        .then(json => json.results);
    }
    return window
      .fetch(`${API_URL}/photos${queryString(params)}`, {
        headers: new Headers({
          Authorization: AUTHORIZATION_TOKEN,
        }),
      })
      .then(response => response.json());
  }

  handleSearchChange = search => this.setState({ search });

  handleSelectPhoto = photoId => this.setState({ selectedPhotoId: photoId });

  handleDeselectPhoto = () => this.setState({ selectedPhotoId: null });

  render() {
    return this.props.children({
      loading: this.state.loading,
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
