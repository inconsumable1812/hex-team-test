import { FC, useRef, useState } from 'react';
import { CAPTION_LIVE_TIME, TEMPLATE_URL } from './constants';

import styles from './TableRow.module.scss';

type Props = {
  short: string;
  target: string;
  counter: number;
};

const TableRow: FC<Props> = ({ short, target, counter }) => {
  const [copyCaption, setCopyCaption] = useState(false);
  const shortAddressRef = useRef<null | HTMLTableCellElement>(null);
  const copyToClipboard = () => {
    if (shortAddressRef.current === null) return;
    const text = shortAddressRef.current.textContent;
    if (text === null) return;
    const url = TEMPLATE_URL + text;
    window.navigator.clipboard.writeText(url);
    setCopyCaption(true);
    setTimeout(() => {
      setCopyCaption(false);
    }, CAPTION_LIVE_TIME);
  };

  return (
    <tr className={styles.tr}>
      <td
        className={styles.short}
        onClick={copyToClipboard}
        ref={shortAddressRef}
      >
        {short}
        {copyCaption && <p className={styles.copySuccess}>copy &#10003;</p>}
      </td>
      <td>{target}</td>
      <td>{counter}</td>
    </tr>
  );
};

export { TableRow };
