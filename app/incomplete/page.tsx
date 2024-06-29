"use client"



import React from 'react'
import { UseGlobalState, UseGlobalUpdate } from '../context/globalProvider';
import Tasks from '../components/Tasks/Tasks';
const Incomplete = () => {

  const { incompleteTasks, setIsLoading } = UseGlobalState();
  setIsLoading(true);
  const { setIsAuthPage } = UseGlobalUpdate();
  setIsAuthPage('false');
setIsLoading(false);
  

return <Tasks title='Do It Now' tasks={incompleteTasks} />;
}

export default Incomplete
