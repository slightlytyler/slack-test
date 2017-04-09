import PhotoThumbnail from 'components/PhotoThumbnail';
import ScrollView from 'components/ScrollView';
import UI from 'core/UI';

const PhotoStream = props => (
  <ScrollView className="PhotoStream">
    {props.photos.map(photo => (
      <PhotoThumbnail key={photo.id} src={photo.urls.small} />
    ))}
  </ScrollView>
);

export default PhotoStream;
