import UI, { Component } from 'core/UI';
// import { API_URL, AUTHORIZATION_TOKEN } from 'src/env';
import photosJson from 'src/mocks/photos.json';

class DataProvider extends Component {
  state = {
    photos: [],
    search: '',
    selectedPhoto: null,
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

  handleSelectPhoto = photo => this.setState({ selectedphoto: photo });

  handleDeselectPhoto = () => this.setState({ selectedphoto: null });

  // eslint-disable-next-line no-console
  handleSelectNextPhoto = () => console.log('next photo');

  // eslint-disable-next-line no-console
  handleSelectPreviousPhoto = () => console.log('previous photo');

  render() {
    return this.props.children({
      photos: this.state.photos,
      search: this.state.search,
      selectedPhoto: this.state.selectedPhoto,
      onDeselectPhoto: this.handleDeselectPhoto,
      onSearchChange: this.handleSearchChange,
      onSelectNextPhoto: this.handleSelectNextPhoto,
      onSelectPhoto: this.handleSelectPhoto,
      onSelectPreviousPhoto: this.handleSelectPreviousPhoto,
    });
  }
}

export default DataProvider;
