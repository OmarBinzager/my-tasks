"use client";
import Tasks from './components/Tasks/Tasks';
import { UseGlobalState, UseGlobalUpdate } from './context/globalProvider';

export default function Home() {
  const { tasks, setIsLoading } = UseGlobalState();
  setIsLoading(true);
  const { setIsAuthPage } = UseGlobalUpdate();
  setIsAuthPage('false');
  setIsLoading(false);

  return (
      <Tasks title='All Tasks' tasks={tasks} />);
}
