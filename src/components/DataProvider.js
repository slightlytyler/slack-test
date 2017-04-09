import UI, { Component } from 'core/UI';
// import { API_URL, AUTHORIZATION_TOKEN } from 'src/env';
import photosJson from 'src/mocks/photos.json';

class DataProvider extends Component {
  state = {
    photos: [],
    search: '',
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

  render() {
    return this.props.children({
      photos: this.state.photos,
      search: this.state.search,
      onSearchChange: this.handleSearchChange,
    });
  }
}

export default DataProvider;
