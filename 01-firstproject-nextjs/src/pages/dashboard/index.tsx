import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import styles from './styles.module.scss';
import Head from 'next/head';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Meu painel de tarefas</title>
      </Head>
      <div className={styles.container}>
        <h1>Página Dashboard</h1>
      </div>
    </>
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
