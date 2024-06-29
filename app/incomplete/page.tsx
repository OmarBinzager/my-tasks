"use client"



import React from 'react'
import { useGlobalState, useGlobalUpdate } from '../context/globalProvider';
import Tasks from '../components/Tasks/Tasks';
const page = () => {

  const { setIsAuthPage } = useGlobalUpdate();
  setIsAuthPage('false');

  

const { incompleteTasks } = useGlobalState();
return <Tasks title='Do It Now' tasks={incompleteTasks} />;
}

export default page
