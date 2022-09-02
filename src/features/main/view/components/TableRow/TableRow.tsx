import { FC } from 'react';

// import styles from './PeopleCard.module.scss';

type Props = {
  short: string;
  target: string;
  counter: number;
};

const TableRow: FC<Props> = ({ short, target, counter }) => {
  return (
    <tr>
      <td>{short}</td>
      <td>{target}</td>
      <td>{counter}</td>
    </tr>
  );
};

export { TableRow };
