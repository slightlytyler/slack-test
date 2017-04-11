import searchIcon from 'assets/search.png';
import Branch from 'components/Branch';
import Spinner from 'components/Spinner';
import UI from 'core/UI';

const handleChange = fn => e => fn(e.target.value);

const Search = props => (
  <div className="Search">
    <Branch
      condition={props.loading}
      renderLeft={() => <Spinner className="icon" />}
      renderRight={() => (
        <img alt="" className="icon" src={searchIcon} />
      )}
    />
    <input
      onChange={handleChange(props.onChange)}
      placeholder="Search photos..."
      type="text"
      value={props.value}
    />
  </div>
);

export default Search;
