import UI from 'core/UI';

const Page = props => (
  <div {...props} className="Page">
    {props.children}
  </div>
);

export default Page;
