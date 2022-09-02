import { LinkObject } from 'src/shared/api/types';

const isFullObject = (obj: Partial<LinkObject>): obj is LinkObject => {
  const isFull =
    obj.counter !== undefined &&
    obj.id !== undefined &&
    obj.short !== undefined &&
    obj.target !== undefined;

  return isFull;
};

export { isFullObject };
