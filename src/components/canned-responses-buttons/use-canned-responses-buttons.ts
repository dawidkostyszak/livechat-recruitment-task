import { useSelector } from 'react-redux';
import { getCannedResponses, getPrivateCannedResponses, getSharedCannedResponses } from '../../store/selectors';
import { CANNED_RESPONSES_BUTTONS } from './configuration';

export const useCannedResponsesButtons = () => {
  const allCannedResponses = useSelector(getCannedResponses);
  const sharedCannedResponses = useSelector(getSharedCannedResponses);
  const privateCannedResponses = useSelector(getPrivateCannedResponses);

  return [
    { ...CANNED_RESPONSES_BUTTONS[0], label: `${CANNED_RESPONSES_BUTTONS[0].label} (${allCannedResponses.length})` },
    { ...CANNED_RESPONSES_BUTTONS[1], label: `${CANNED_RESPONSES_BUTTONS[1].label} (${sharedCannedResponses.length})` },
    {
      ...CANNED_RESPONSES_BUTTONS[2],
      label: `${CANNED_RESPONSES_BUTTONS[2].label} (${privateCannedResponses.length})`,
    },
  ];
};
