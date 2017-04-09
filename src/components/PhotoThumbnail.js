import Box from 'components/Box';
import UI from 'core/UI';

const PhotoThumbnail = props => (
  <Box flexDirection="column">
    <img alt="thumbnail" src={props.src} />
  </Box>
);

export default PhotoThumbnail;
