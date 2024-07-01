import { HTMLProps } from 'react';
import styles from './styles.module.scss';

export const Textarea = ({ ...rest }: HTMLProps<HTMLTextAreaElement>) => {
  return <textarea className={styles.textare} {...rest}></textarea>;
};
