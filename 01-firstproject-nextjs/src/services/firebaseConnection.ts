import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCcWQ8sc8BlJlnwVFikCoj3qhNSJ-MgBSg',
  authDomain: 'tarefasplus-e5b5e.firebaseapp.com',
  projectId: 'tarefasplus-e5b5e',
  storageBucket: 'tarefasplus-e5b5e.appspot.com',
  messagingSenderId: '226803967520',
  appId: '1:226803967520:web:261e15ab2e75eabe257e45',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
