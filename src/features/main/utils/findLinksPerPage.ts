import { LinkObject } from 'src/shared/api/types';

type Args = {
  linkObjects: LinkObject[];
  activePage: number;
  itemsCountPerPage: number;
};

export const findLinksPerPage = ({
  linkObjects,
  activePage,
  itemsCountPerPage
}: Args) => {
  const firstIndex = (activePage - 1) * itemsCountPerPage;
  const secondIndex = activePage * itemsCountPerPage;
  return [...linkObjects].slice(firstIndex, secondIndex);
};
