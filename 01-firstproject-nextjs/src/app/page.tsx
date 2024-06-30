import styles from '../styles/home.module.scss';
import Image from 'next/image';
import heroImg from '../../public/assets/hero.png';

export default function Home() {
  return (
    <div className={styles.conteiner}>
      <main>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt="logo tarefas"
            src={heroImg}
            priority
          />
        </div>
        <h1>
          sitema feito pra vc organizar <br />
          seus estudos e tarefas
        </h1>
      </main>
    </div>
  );
}
