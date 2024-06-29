"use client";
import Tasks from './components/Tasks/Tasks';
import { useRouter } from 'next/navigation';
import {auth} from '@/app/utils/menu';
import { useGlobalState, useGlobalUpdate } from './context/globalProvider';

export default function Home() {
  const { setIsAuthPage } = useGlobalUpdate();
  setIsAuthPage('false');
  // if (isAuth == 'false' || !isAuth) {
  //       router.push(auth[0].link)
  //   }
  const { tasks } = useGlobalState();
  return (
      <Tasks title='All Tasks' tasks={tasks} />);
}
