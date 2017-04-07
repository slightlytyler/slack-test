import Element from 'core/Element';

const computeStyles = props => ({
  color: 'red',
});

const Box = props => (
  <div>
    {props.children}
  </div>
);

export default Box;
