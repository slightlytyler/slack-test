import Branch from 'components/Branch';
import Overlay from 'components/Overlay';
import PhotoPreview from 'components/PhotoPreview';
import UI from 'core/UI';
import cx from 'helpers/string/cx';

const Lightbox = props => (
  <div className={cx('Lightbox', { open: props.open })}>
    <Overlay onClick={props.onClose} />
    <div className="canvas">
      <Branch
        condition={Boolean(props.photo)}
        renderLeft={() => (
          <PhotoPreview
            author={props.photo.author}
            location={props.photo.location}
            src={props.photo.urls.regular}
          />
        )}
      />
    </div>
  </div>
);

export default Lightbox;
