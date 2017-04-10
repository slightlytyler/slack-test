import Box from 'components/Box';
import UI from 'core/UI';
import cx from 'helpers/string/cx';

const PhotoPreview = props => (
  <div
    className={cx('PhotoPreview', props.className)}
    onClick={props.onClick}
    style={{ backgroundImage: `url(${props.src})` }}
  >
    <Box className="details" column>
      <div className="author">{props.author}</div>
      <div className="location">{props.location}</div>
    </Box>
  </div>
);

export default PhotoPreview;
