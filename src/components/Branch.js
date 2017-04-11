import UI from 'core/UI';

const noRender = () => <span />;

const Branch = ({ condition, renderLeft = noRender, renderRight = noRender }) => (
  condition ? renderLeft() : renderRight()
);

export default Branch;
