import Head from 'next/head';
import styles from './styles.module.scss';
import { GetServerSideProps } from 'next';
import { db } from '../../services/firebaseConnection';
import { doc, collection, query, where, getDoc } from 'firebase/firestore';
import { redirect } from 'next/dist/server/api-utils';
import { Textarea } from '@/src/components/Textarea';

interface ITaskProps {
  item: {
    tarefa: string;
    public: boolean;
    created_At: string;
    user: string;
    userId: string;
  };
}

export default function Task({ item }: ITaskProps) {
  return (
    <div className={styles.conteiner}>
      <Head>
        <title>Tarefa - Detalhes da tarefa</title>
      </Head>

      <main className={styles.main}>
        <h1>Tarefa</h1>
        <article className={styles.task}>{item?.tarefa}</article>
      </main>

      <section className={styles.commentsConteiner}>
        <h2>Deixar comentario</h2>

        <form>
          <Textarea placeholder="Digite seu comentario..." />
          <button className={styles.button}>Enviar comentario</button>
        </form>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  const docRef = doc(db, 'tarefas', id);
  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const miliseconds = snapshot.data()?.created_At.seconds * 1000;
  const task = {
    tarefa: snapshot.data()?.tarefa,
    public: snapshot.data()?.public,
    created_At: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    userId: id,
  };

  console.log(task);

  return {
    props: {
      item: task,
    },
  };
};
