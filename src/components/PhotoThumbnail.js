import PhotoPreview from 'components/PhotoPreview';
import UI from 'core/UI';
import cx from 'helpers/string/cx';

const handleClick = (fn, photo) => () => fn(photo);

const PhotoThumbnail = props => (
  <PhotoPreview
    author={props.author}
    className={cx('PhotoThumbnail', props.className)}
    downloadSrc={props.downloadSrc}
    location={props.location}
    onClick={handleClick(props.onSelect, props.id)}
    src={props.src}
  />
);

export default PhotoThumbnail;
