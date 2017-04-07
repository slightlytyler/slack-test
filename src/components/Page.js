import Box from 'components/Box';
import UI from 'core/UI';

const Page = ({ children, flexDirection = 'column', ...props }) => (
  <Box
    {...props}
    flexDirection={flexDirection}
    height="100vh"
    width="100vw"
  >
    {children}
  </Box>
);

export default Page;
