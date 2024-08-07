"use client";
import Tasks from './components/Tasks/Tasks';
import { useRouter } from 'next/navigation';
import {auth} from '@/app/utils/menu';
import { UseGlobalState, UseGlobalUpdate } from './context/globalProvider';

export default function Home() {
  const { setIsAuthPage } = UseGlobalUpdate();
  setIsAuthPage('false');
  // if (isAuth == 'false' || !isAuth) {
  //       router.push(auth[0].link)
  //   }
  const { tasks } = UseGlobalState();
  return (
      <Tasks title='All Tasks' tasks={tasks} />);
}
