"use client"



import React from 'react'
import { UseGlobalState, UseGlobalUpdate } from '../context/globalProvider';
import Tasks from '../components/Tasks/Tasks';
const Incomplete = () => {

  const { incompleteTasks } = UseGlobalState();
  const { setIsAuthPage } = UseGlobalUpdate();
  setIsAuthPage('false');

  

return <Tasks title='Do It Now' tasks={incompleteTasks} />;
}

export default Incomplete
