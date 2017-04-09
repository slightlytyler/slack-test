import UI from 'core/UI';

const PhotoThumbnail = props => (
  <div
    className="PhotoThumbnail"
    style={{
      backgroundImage: `url(${props.src})`,
    }}
  />
);

export default PhotoThumbnail;
