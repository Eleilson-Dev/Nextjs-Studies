import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import styles from './styles.module.scss';
import Head from 'next/head';
import { Textarea } from '@/src/components/Textarea';
import { FiShare2 } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { db } from '../../services/firebaseConnection';
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from 'firebase/firestore';

interface IHomeProps {
  user: {
    email: string;
  };
}

interface ITaskProps {
  id: string;
  created_At: Date;
  public: boolean;
  tarefa: string;
  user: string;
}

export default function Dashboard({ user }: IHomeProps) {
  const [input, setInput] = useState('');
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, settasks] = useState<ITaskProps[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const tasksRef = collection(db, 'tarefas');
      const q = query(
        tasksRef,
        orderBy('created_At', 'desc'),
        where('user', '==', user?.email)
      );

      onSnapshot(q, (snapShot) => {
        let list = [] as ITaskProps[];
        snapShot.forEach((doc) => {
          list.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            created_At: doc.data().created_At,
            user: doc.data().user,
            public: doc.data().public,
          });
        });

        settasks(list);
      });
    };

    loadTasks();
  }, [user?.email]);

  const handleChangePublic = (event: ChangeEvent<HTMLInputElement>) => {
    setPublicTask(event.target.checked);
  };

  const handleRegisterTask = async (event: FormEvent) => {
    event.preventDefault();

    if (input === '') return;

    try {
      await addDoc(collection(db, 'tarefas'), {
        tarefa: input,
        created_At: new Date(),
        user: user?.email,
        public: publicTask,
      });

      setInput('');
      setPublicTask(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.conteiner}>
      <Head>
        <title>Meu painel de tarefas</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa</h1>
            <form onSubmit={handleRegisterTask}>
              <Textarea
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                  setInput(event.target.value);
                }}
                placeholder="Digite qual sua tarefa..."
              />
              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={publicTask}
                  onChange={handleChangePublic}
                />
                <label>Deixar tarefa publica ?</label>
              </div>

              <button className={styles.button} type="submit">
                Registrar
              </button>
            </form>
          </div>
        </section>

        <section className={styles.taskConteiner}>
          <h1>Minhas tarefas</h1>

          {tasks.map((item) => (
            <article key={item.id} className={styles.task}>
              {item.public && (
                <div className={styles.tagConteiner}>
                  <label className={styles.tag}>PUBLICO</label>
                  <button className={styles.shareButton}>
                    <FiShare2 size={22} color="#3183ff" />
                  </button>
                </div>
              )}

              <div className={styles.taskContent}>
                <p>{item.tarefa}</p>

                <button className={styles.trashButton}>
                  <FaTrash size={24} color="#ea3140" />
                </button>
              </div>
            </article>
          ))}
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
    props: {
      user: {
        email: session.user.email,
      },
    },
  };
};
