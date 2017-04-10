import Branch from 'components/Branch';
import Overlay from 'components/Overlay';
import PhotoPreview from 'components/PhotoPreview';
import UI from 'core/UI';
import cx from 'helpers/string/cx';

const handleSelectPhoto = (fn, photoId) => () => fn(photoId);

const Lightbox = props => (
  <div className={cx('Lightbox', { open: props.open })}>
    <Overlay onClick={props.onClose} />
    <div className="canvas">
      <Branch
        condition={Boolean(props.photo)}
        renderLeft={() => (
          <PhotoPreview
            author={props.photo.user.name}
            location={props.photo.user.location}
            src={props.photo.urls.regular}
          />
        )}
      />
      <Branch
        condition={Boolean(props.previousPhotoId)}
        renderLeft={() => (
          <button
            className="left button"
            onClick={handleSelectPhoto(props.onSelectPhoto, props.previousPhotoId)}
          >
              &larr;
          </button>
        )}
      />
      <Branch
        condition={Boolean(props.nextPhotoId)}
        renderLeft={() => (
          <button
            className="right button"
            onClick={handleSelectPhoto(props.onSelectPhoto, props.nextPhotoId)}
          >
              &rarr;
          </button>
        )}
      />
    </div>
  </div>
);

export default Lightbox;
