import { FC, SyntheticEvent } from 'react';

import styles from './Input.module.scss';

type Props = {
  value: string | number;
  type: 'text' | 'password';
  label: string;
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Input: FC<Props> = ({
  value,
  placeholder = 'Введите значение',
  type,
  label,
  onChange
}) => {
  return (
    <label className={styles.label}>
      <p>{label}</p>
      <input
        className={styles.input}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      ></input>
    </label>
  );
};

export { Input };
