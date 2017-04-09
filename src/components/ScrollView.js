import UI from 'core/UI';
import cx from 'helpers/string/cx';

const ScrollView = props => (
  <div className={cx('ScrollView', props.className)}>
    {props.children}
  </div>
);

export default ScrollView;
