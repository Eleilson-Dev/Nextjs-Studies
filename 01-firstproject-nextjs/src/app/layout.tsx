import type { Metadata } from 'next';
import '../styles/index.css';

import { Header } from '../components/Header';
import SessionWrapper from '../providers/SessionWrapper';

export const metadata: Metadata = {
  title: 'Tarefas+ | Organize suas tarefas de forma fácil',
  description: 'Gerado pelo create next app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <SessionWrapper>
          <Header />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
