import { CannedResponse } from '../../types/canned-responses';

export function searchCannedResponses(cannedResponses: CannedResponse[], search: string): CannedResponse[] {
  if (!search) {
    return cannedResponses;
  }

  return cannedResponses.filter(
    (cannedResponse) => searchByContent(cannedResponse, search) || searchByTag(cannedResponse, search),
  );
}

function searchByContent(cannedResponse: CannedResponse, search: string): boolean {
  return cannedResponse.text.toLowerCase().includes(search.toLowerCase());
}

function searchByTag(cannedResponse: CannedResponse, search: string): boolean {
  return cannedResponse.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
}
