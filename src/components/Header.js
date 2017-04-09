import UI from 'core/UI';

const handleSearchChange = fn => e => fn(e.target.value);

const Header = props => (
  <div>
    <input
      onChange={handleSearchChange(props.onSearchChange)}
      placeholder="Search for a category"
      type="text"
      value={props.search}
    />
  </div>
);

export default Header;
