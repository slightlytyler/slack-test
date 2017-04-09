import Box from 'components/Box';
import UI from 'core/UI';

const PhotoThumbnail = props => (
  <div
    className="PhotoThumbnail"
    style={{
      backgroundImage: `url(${props.src})`,
    }}
  >
    <Box className="details" column>
      <div className="author">{props.author}</div>
      <div className="location">{props.location}</div>
    </Box>
  </div>
);

export default PhotoThumbnail;
