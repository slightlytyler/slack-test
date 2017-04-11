import Box from 'components/Box';
import PhotoThumbnail from 'components/PhotoThumbnail';
import ScrollView from 'components/ScrollView';
import Spinner from 'components/Spinner';
import UI from 'core/UI';

const renderPhotos = (photos, onSelect) => {
  if (photos === null) return <Spinner large />;
  if (!photos.length) {
    return ([
      <Box center className="empty" fit>No photos found.</Box>,
    ]);
  }
  return photos.map(photo => (
    <PhotoThumbnail
      author={photo.user.name}
      className="thumbnail"
      downloadSrc={photo.links.download}
      id={photo.id}
      key={photo.id}
      location={photo.user.location}
      onSelect={onSelect}
      src={photo.urls.small}
    />
  ));
};

const PhotoStream = props => (
  <ScrollView className="PhotoStream">
    {renderPhotos(props.photos, props.onSelectPhoto)}
  </ScrollView>
);

export default PhotoStream;
