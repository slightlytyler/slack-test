import Box from 'components/Box';
import UI from 'core/UI';
import cx from 'helpers/cx';

const handleDownloadClick = e => e.stopPropagation();

const renderAuthor = author => (
  author ? <div className="author">{author}</div> : null
);

const renderDownloadButton = src => (
  <a
    className="download"
    download
    href={src}
    onClick={handleDownloadClick}
  >
    <svg
      enableBackground="new 0 0 26 20"
      fill="#000000"
      height="20"
      viewBox="0 0 26 20"
      width="26"
    >
      <path
        d="M 15.5 4 C 13.3 4 11.2 5.2 10 7 L 9.5 7 C 7 7 4.8875 8.7 4.1875 11 C 1.8875 11.1 5.9211895e-16 13.1 0 15.5 C 0 18 2 20 4.5 20 L 20.5 20 C 23.5 20 26 17.5 26 14.5 C 26 12 24.30625 9.7875 21.90625 9.1875 C 21.30625 6.1875 18.6 4 15.5 4 z M 15.5 6 C 17.8 6 19.8 7.79375 20 10.09375 L 20 11 L 20.8125 11.09375 C 22.6125 11.29375 23.90625 12.79375 23.90625 14.59375 C 24.00625 16.39375 22.4 18 20.5 18 L 4.5 18 C 3.1 18 2 16.9 2 15.5 C 2 14.1 3.1 13 4.5 13 L 4.90625 13 L 5.90625 13.1875 L 6 12.1875 C 6.2 10.3875 7.7 9 9.5 9 C 9.7 9 10.0125 8.99375 10.3125 9.09375 L 11.09375 9.3125 L 11.40625 8.59375 C 12.20625 6.99375 13.8 6 15.5 6 z M 13 10 L 13 13 L 10.5 13 L 14 16.5 L 17.5 13 L 15 13 L 15 10 L 13 10 z"
        enableBackground="accumulate"
      />
    </svg>
  </a>
);

const renderLocation = location => (
  location ? <div className="location">{location}</div> : null
);

const PhotoPreview = props => (
  <div
    className={cx('PhotoPreview', props.className)}
    onClick={props.onClick}
    style={{ backgroundImage: `url(${props.src})` }}
  >
    <Box className="details" column>
      {renderAuthor(props.author)}
      {renderLocation(props.location)}
    </Box>
    {renderDownloadButton(props.downloadSrc)}
  </div>
);

export default PhotoPreview;
