import UI from 'core/UI';

const handleChange = fn => e => fn(e.target.value);

const Search = props => (
  <input
    className="Search"
    onChange={handleChange(props.onChange)}
    placeholder="Search photos..."
    type="text"
    value={props.value}
  />
);

export default Search;
