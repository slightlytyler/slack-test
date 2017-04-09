import Box from 'components/Box';
import UI from 'core/UI';

const Header = props => (
  <Box alignItems="center" className="Header" justifyContent="space-between">
    {props.children}
  </Box>
);

export default Header;
