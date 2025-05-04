import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { setSearchAction } from '../../store/actions';

export const useCannedResponses = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const debouncedDispatch = debounce(dispatch, 500);

  const handleSearch = (value: string) => {
    setSearch(value);
    debouncedDispatch(setSearchAction(value));
  };

  return {
    search,
    handleSearch,
  };
};
