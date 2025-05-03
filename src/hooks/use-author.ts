import { useDispatch, useSelector } from 'react-redux';
import { getAuthors } from '../store/selectors';
import { useCallback, useEffect, useState } from 'react';
import { Author } from '../types/author';
import { setAuthorAction } from '../store/actions';

interface UseAuthor {
  cannedResponseId: string;
  skip: boolean;
}

export const useAuthor = ({ cannedResponseId, skip }: UseAuthor) => {
  const authors = useSelector(getAuthors);
  const dispatch = useDispatch();
  const [author, setAuthor] = useState<Author | null>(authors[cannedResponseId] ?? null);
  const authorExists = Boolean(author);

  const handleSetAuthor = useCallback(
    (author: Author) => {
      dispatch(setAuthorAction(cannedResponseId, author));
    },
    [cannedResponseId, dispatch],
  );

  useEffect(() => {
    async function getAuthor() {
      const response = await fetch(`https://randomuser.me/api/?seed=${cannedResponseId}`);
      const jsonResponse = await response.json();
      const author = jsonResponse.results[0];

      setAuthor(author);
      handleSetAuthor(author);
    }

    if (!skip && !authorExists) {
      getAuthor();
    }
  }, [cannedResponseId, skip, authorExists, handleSetAuthor]);

  return author;
};
