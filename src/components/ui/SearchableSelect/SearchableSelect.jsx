import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import "./SearchableSelect.css";

const SearchableSelect = ({
  label,
  placeholder = "Choose an option",
  options = [],
  value,
  onChange,
  searchPlaceholder = "Search...",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef = useRef(null);

  // Fermer le dropdown lorsqu'on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Option sélectionnée
  const selectedOption = options.find(
    (option) => String(option.value) === String(value)
  );

  // Recherche dynamique
  const filteredOptions = options.filter((option) => {
    const searchValue = search.toLowerCase();

    return (
      option.label.toLowerCase().includes(searchValue) ||
      option.description?.toLowerCase().includes(searchValue)
    );
  });

  const handleSelect = (option) => {
    onChange?.(option.value);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div
      className={`searchable-select ${isOpen ? "searchable-select--open" : ""}`}
      ref={containerRef}
    >
      {/*  {label && <label className="searchable-select__label">{label}</label>} */}

      {/* Trigger */}
      <button
        type="button"
        className="searchable-select__trigger"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        disabled={disabled}
        aria-expanded={isOpen}
      >
        <div className="searchable-select__trigger-content">
          {selectedOption ? (
            <>
              {selectedOption.icon && (
                <div className="searchable-select__icon">
                  <selectedOption.icon size={25} strokeWidth={2} />
                </div>
              )}

              <span className="searchable-select__selected">
                {selectedOption.label}
              </span>
            </>
          ) : (
            <span className="searchable-select__placeholder">
              {placeholder}
            </span>
          )}
        </div>

        <ChevronDown
          className="searchable-select__chevron"
          size={27}
          strokeWidth={2}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="searchable-select__dropdown">
          {/* Search */}
          <div className="searchable-select__search">
            <Search size={25} strokeWidth={2} />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              autoFocus
            />
          </div>

          {/* Options */}
          <div className="searchable-select__options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const Icon = option.icon;

                const isSelected = String(option.value) === String(value);

                return (
                  <button
                    type="button"
                    key={option.value}
                    className={`searchable-select__option ${
                      isSelected ? "searchable-select__option--selected" : ""
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    {Icon && (
                      <div className="searchable-select__option-icon">
                        <Icon size={27} strokeWidth={2} />
                      </div>
                    )}

                    <div className="searchable-select__option-content">
                      <span className="searchable-select__option-label">
                        {option.label}
                      </span>

                      {option.description && (
                        <span className="searchable-select__option-description">
                          {option.description}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="searchable-select__empty">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
