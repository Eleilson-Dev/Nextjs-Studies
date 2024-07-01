import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import styles from './styles.module.scss';

export const Header = () => {
  const { data: session, status } = useSession();
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href="/">
            <h1>
              Tarefas<span>+</span>
            </h1>
          </Link>

          {session?.user && (
            <Link className={styles.link} href="/dashboard">
              Meu Painel
            </Link>
          )}
        </nav>

        {status === 'loading' ? (
          <></>
        ) : session ? (
          <button className={styles.loginBtn} onClick={() => signOut()}>
            ola {session.user?.name}
          </button>
        ) : (
          <button className={styles.loginBtn} onClick={() => signIn('google')}>
            Acessar
          </button>
        )}
      </section>
    </header>
  );
};
