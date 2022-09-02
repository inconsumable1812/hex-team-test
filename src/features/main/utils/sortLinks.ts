import { LinkObject } from 'src/shared/api/types';

type Args = {
  linkObjects: LinkObject[];
  isDescendingByCount: boolean;
  isDescendingByTarget: boolean;
  isDescendingByShort: boolean;
};

export const sortLinks = ({
  linkObjects,
  isDescendingByTarget,
  isDescendingByShort,
  isDescendingByCount
}: Args) => {
  return [...linkObjects].sort((a, b) => {
    if (isDescendingByTarget) {
      if (a.target > b.target) return 1;
      if (a.target === b.target) return 0;
      if (a.target < b.target) return -1;
    }

    if (isDescendingByShort) {
      if (a.short > b.short) return 1;
      if (a.short === b.short) return 0;
      if (a.short < b.short) return -1;
    }

    return isDescendingByCount
      ? a.counter - b.counter
      : -(a.counter - b.counter);
  });
};
