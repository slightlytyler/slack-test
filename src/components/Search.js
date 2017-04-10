import UI from 'core/UI';

const handleChange = fn => e => fn(e.target.value);

const renderIcon = () => (
  <svg
    className="icon"
    height="32"
    viewBox="0 0 32 32"
    width="32"
  >
    <path d="M31.4 28.6l-6.2-6.2c1.8-2.3 2.8-5.2 2.8-8.4 0-7.7-6.3-14-14-14s-14 6.3-14 14 6.3 14 14 14c3.1 0 6-1.1 8.4-2.8l6.2 6.2c.4.4.9.6 1.4.6s1-.2 1.4-.6c.8-.8.8-2 0-2.8zm-17.4-4.6c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z" />
  </svg>
);

const Search = props => (
  <div className="Search">
    {renderIcon()}
    <input
      onChange={handleChange(props.onChange)}
      placeholder="Search photos..."
      type="text"
      value={props.value}
    />
  </div>
);

export default Search;
