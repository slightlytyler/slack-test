import UI from 'core/UI';

const noRender = () => null;

const Branch = ({ condition, renderLeft = noRender, renderRight = noRender }) => (
  condition ? renderLeft() : renderRight()
);

export default Branch;
