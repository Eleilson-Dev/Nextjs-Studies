import type { Metadata } from 'next';
import styles from './styles.module.scss';

export const metadata: Metadata = {
  title: 'Meu painel de tarefas',
};

export default function Dashboard() {
  return (
    <div className={styles.conteiner}>
      <h1>pagina dashboard</h1>
    </div>
  );
}
