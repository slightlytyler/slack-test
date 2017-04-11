import downloadIcon from 'assets/download.png';
import Box from 'components/Box';
import Branch from 'components/Branch';
import UI from 'core/UI';
import cx from 'helpers/cx';

const handleDownloadClick = e => e.stopPropagation();

const PhotoPreview = props => (
  <div
    className={cx('PhotoPreview', props.className)}
    onClick={props.onClick}
    style={{ backgroundImage: `url(${props.src})` }}
  >
    <Box className="details" column>
      <Branch
        condition={Boolean(props.author)}
        renderLeft={() => (<div className="author">{props.author}</div>)}
      />
      <Branch
        condition={Boolean(props.location)}
        renderLeft={() => (<div className="location">{props.location}</div>)}
      />
    </Box>
    <a
      className="download"
      download
      href={props.downloadSrc}
      onClick={handleDownloadClick}
    >
      <img alt="" src={downloadIcon} />
    </a>
  </div>
);

export default PhotoPreview;
