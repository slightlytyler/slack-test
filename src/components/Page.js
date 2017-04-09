import Box from 'components/Box';
import UI from 'core/UI';

const Page = props => (
  <Box
    {...props}
    flexDirection={props.flexDirection}
  >
    {props.children}
  </Box>
);

export default Page;
