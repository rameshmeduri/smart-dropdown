import { useState, useEffect } from 'react';
import countries from './countries.json';

const findStrInArray = (str) => {
  const rx = new RegExp(`${str}`, 'i');
  return countries.filter((country) => {
    return rx.test(country);
  });
};

// api
const searchCountry = (str) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const results = findStrInArray(str);
      if (results && results.length) {
        resolve(results);
      } else {
        resolve('NO_RESULTS');
      }
    }, 400);
  });
};

// useDebounce Hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};

export { searchCountry, useDebounce };
