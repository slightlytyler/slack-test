import PhotoThumbnail from 'components/PhotoThumbnail';
import ScrollView from 'components/ScrollView';
import UI from 'core/UI';

const PhotoStream = props => (
  <ScrollView className="PhotoStream">
    {props.photos.map(photo => (
      <PhotoThumbnail
        author={photo.user.name}
        id={photo.id}
        key={photo.id}
        location={photo.user.location}
        onSelect={props.onSelectPhoto}
        src={photo.urls.small}
      />
    ))}
  </ScrollView>
);

export default PhotoStream;
