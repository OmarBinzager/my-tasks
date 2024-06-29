"use client";
import Tasks from './components/Tasks/Tasks';
import { useRouter } from 'next/navigation';
import {auth} from '@/app/utils/menu';
import { UseGlobalState, UseGlobalUpdate } from './context/globalProvider';

export default function Home() {
  const { tasks, setIsLoading } = UseGlobalState();
  setIsLoading(true);
  const { setIsAuthPage } = UseGlobalUpdate();
  setIsAuthPage('false');
  setIsLoading(false);
  // if (isAuth == 'false' || !isAuth) {
  //       router.push(auth[0].link)
  //   }
  return (
      <Tasks title='All Tasks' tasks={tasks} />);
}
