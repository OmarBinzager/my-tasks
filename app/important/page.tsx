"use client";



import React from 'react'
import { UseGlobalState, UseGlobalUpdate } from '../context/globalProvider';
import Tasks from '../components/Tasks/Tasks';

const page = () => {

    const { setIsAuthPage } = UseGlobalUpdate();
    setIsAuthPage('false');


const { importantTasks } = UseGlobalState();
return <Tasks title='Important Tasks' tasks={importantTasks} importantPage={true} />;
}

export default page;