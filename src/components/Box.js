import UI from 'core/UI';

const computeStyles = props => ({
  display: 'flex',
  flex: props.flex,
  flexDirection: props.flexDirection,
  alignItems: props.alignItems,
  justifyContent: props.justifyContent,
  width: props.width,
  height: props.height,
});

const Box = props => (
  <div style={computeStyles(props)}>
    {props.children}
  </div>
);

export default Box;
