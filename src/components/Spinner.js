import UI from 'core/UI';
import cx from 'helpers/cx';

const Spinner = props => (
  <div className={cx('Spinner', props.className, { large: props.large })} />
);

export default Spinner;
