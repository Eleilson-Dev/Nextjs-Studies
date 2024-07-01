import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import styles from './styles.module.scss';
import Head from 'next/head';
import { Textarea } from '@/src/components/Textarea';

export default function Dashboard() {
  return (
    <div className={styles.conteiner}>
      <Head>
        <title>Meu painel de tarefas</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa</h1>
            <form>
              <Textarea placeholder="Digite qual sua tarefa..." />
              <div className={styles.checkboxArea}>
                <input type="checkbox" className={styles.checkbox} />
                <label>Deixar tarefa publica ?</label>
              </div>

              <button className={styles.button} type="submit">
                Registrar
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
