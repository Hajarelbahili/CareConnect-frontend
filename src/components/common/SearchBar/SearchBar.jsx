import { Search } from "lucide-react";
import "./SearchBar.css";

const SearchBar = ({
  placeholder = "Search...",
  buttonText = "Search",
  value = "",
  onChange,
  onSearch
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__input-wrapper">
        <Search size={15} className="search-bar__icon" />

        <input
          type="text"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder={placeholder}
        />
      </div>

      <button type="submit">
        {buttonText}

        <span className="search-bar__arrow">→</span>
      </button>
    </form>
  );
};

export default SearchBar;
