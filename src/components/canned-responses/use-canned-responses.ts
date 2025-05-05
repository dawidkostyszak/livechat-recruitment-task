import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { setSearchAction } from '../../store/actions';

export const useCannedResponses = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const debouncedDispatch = debounce(() => dispatch(setSearchAction(search)), 1000);

  useEffect(() => {
    debouncedDispatch();
    return () => debouncedDispatch.cancel();
  }, [debouncedDispatch]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return {
    search,
    handleSearch,
  };
};
