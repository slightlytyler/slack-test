import UI from 'core/UI';
import cx from 'helpers/string/cx';

const Box = props => (
  <div
    className={cx(
      'Box',
      props.className,
      {
        'align-items--flex-start': props.alignItems === 'flex-start',
        'align-items--flex-end': props.alignItems === 'flex-end',
        'align-items--space-between': props.alignItems === 'space-between',
        'align-items--space-around': props.alignItems === 'space-around',
        'align-items--center': props.alignItems === 'center',
        'justify-content--flex-start': props.justifyContent === 'flex-start',
        'justify-content--flex-end': props.justifyContent === 'flex-end',
        'justify-content--space-between': props.justifyContent === 'space-between',
        'justify-content--space-around': props.justifyContent === 'space-around',
        'justify-content--center': props.justifyContent === 'center',
        column: props.flexDirection === 'column',
        center: props.center,
        fit: props.fit,
      },
    )}
  >
    {props.children}
  </div>
);

export default Box;
