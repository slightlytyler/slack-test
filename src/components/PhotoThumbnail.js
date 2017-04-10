import PhotoPreview from 'components/PhotoPreview';
import UI from 'core/UI';

const handleClick = (fn, photo) => () => fn(photo);

const PhotoThumbnail = props => (
  <PhotoPreview
    author={props.author}
    className="PhotoThumbnail"
    location={props.location}
    onClick={handleClick(props.onSelect, props.id)}
    src={props.src}
  />
);

export default PhotoThumbnail;
