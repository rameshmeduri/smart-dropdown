import React, { useState, useEffect, useCallback, Fragment } from 'react';
import onClickOutside from 'react-onclickoutside';
import { searchCountry, useDebounce } from './utils';
import './Dropdown.scss';

function Dropdown({ onSelectCallback }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Select a location');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      searchCountry(debouncedSearchTerm).then((res) => {
        setResults(res);
      });
    } else {
      setResults(null);
    }
  }, [debouncedSearchTerm]);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  Dropdown.handleClickOutside = () => setOpen(false);

  const onClick = (item) => {
    setValue(item);
    setOpen(false);
    onSelectCallback(item);
  };

  let content = null;
  const len = debouncedSearchTerm.length;

  if (len) {
    if (results === 'NO_RESULTS') {
      content = <div className="no_results">NO RESULTS FOUND</div>;
    } else {
      if (results) {
        content = (
          <ul className="dd-list">
            {results.map((item) => (
              <li className="dd-list-item" key={item} onClick={() => onClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        );
      }
    }
  }

  return (
    <div className="dd-wrapper">
      <div className="dd-header" onClick={toggle}>
        <div className="dd-header__title">{value}</div>
        <div className="dd-header__action">&#9660;</div>
      </div>
      {open && (
        <Fragment>
          <div className="dd-textbox-wrapper">
            <input type="search" placeholder="" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="dd-content-wrapper">{content}</div>
        </Fragment>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside
};

export default onClickOutside(Dropdown, clickOutsideConfig);
