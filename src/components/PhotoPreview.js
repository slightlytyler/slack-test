import Box from 'components/Box';
import UI from 'core/UI';
import cx from 'helpers/string/cx';

const renderAuthor = author => (
  author ? <div className="author">{author}</div> : null
);

const renderLocation = location => (
  location ? <div className="location">{location}</div> : null
);

const PhotoPreview = props => (
  <div
    className={cx('PhotoPreview', props.className)}
    onClick={props.onClick}
    style={{ backgroundImage: `url(${props.src})` }}
  >
    <Box className="details" column>
      {renderAuthor(props.author)}
      {renderLocation(props.location)}
    </Box>
  </div>
);

export default PhotoPreview;
