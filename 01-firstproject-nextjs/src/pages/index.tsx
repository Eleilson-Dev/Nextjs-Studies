import Image from 'next/image';
import styles from '../styles/home.module.scss';
import Head from 'next/head';
import heroImg from '../../public/assets/hero.png';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>

      <div className={styles.conteiner}>
        <main>
          <div className={styles.logoContent}>
            <Image alt="logo tarefas" src={heroImg} priority />
          </div>
          <h1>
            sitema feito pra vc organizar <br />
            seus estudos e tarefas
          </h1>
        </main>

        <div className={styles.infoContent}>
          <section>
            <span>+12 posts</span>
          </section>

          <section>
            <span>+90 comentarios</span>
          </section>
        </div>
      </div>
    </>
  );
}
