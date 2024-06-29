"use client"



import React from 'react'
import { UseGlobalState, UseGlobalUpdate } from '../context/globalProvider';
import Tasks from '../components/Tasks/Tasks';
const page = () => {

  const { setIsAuthPage } = UseGlobalUpdate();
  setIsAuthPage('false');

  

const { incompleteTasks } = UseGlobalState();
return <Tasks title='Do It Now' tasks={incompleteTasks} />;
}

export default page
