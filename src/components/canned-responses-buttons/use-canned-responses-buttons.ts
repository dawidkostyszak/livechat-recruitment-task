import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCannedResponses,
  getFilter,
  getPrivateCannedResponses,
  getSharedCannedResponses,
} from '../../store/selectors';
import { CANNED_RESPONSES_BUTTONS } from './configuration';
import { setFilterAction } from '../../store/actions';
import type { CannedResponseFilterType } from '../../types/filter-type';

export const useCannedResponsesButtons = () => {
  const allCannedResponses = useSelector(getAllCannedResponses);
  const sharedCannedResponses = useSelector(getSharedCannedResponses);
  const privateCannedResponses = useSelector(getPrivateCannedResponses);

  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleSetFilter = (id: string) => {
    dispatch(setFilterAction(id as CannedResponseFilterType));
  };

  const buttons = [
    { ...CANNED_RESPONSES_BUTTONS[0], label: `${CANNED_RESPONSES_BUTTONS[0].label} (${allCannedResponses.length})` },
    { ...CANNED_RESPONSES_BUTTONS[1], label: `${CANNED_RESPONSES_BUTTONS[1].label} (${sharedCannedResponses.length})` },
    {
      ...CANNED_RESPONSES_BUTTONS[2],
      label: `${CANNED_RESPONSES_BUTTONS[2].label} (${privateCannedResponses.length})`,
    },
  ];

  return {
    buttons,
    filter,
    handleSetFilter,
  };
};
