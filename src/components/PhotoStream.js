import PhotoThumbnail from 'components/PhotoThumbnail';
import UI from 'core/UI';

const PhotoStream = props => (
  <div className="photo-stream">
    {props.photos.map(photo => (
      <PhotoThumbnail src={photo.urls.small} />
    ))}
  </div>
);

export default PhotoStream;
