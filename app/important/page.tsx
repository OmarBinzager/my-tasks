"use client";



import React from 'react'
import { UseGlobalState, UseGlobalUpdate } from '../context/globalProvider';
import Tasks from '../components/Tasks/Tasks';

const Important = () => {

    const { importantTasks, setIsLoading } = UseGlobalState();
    setIsLoading(true);
    const { setIsAuthPage } = UseGlobalUpdate();
    setIsAuthPage('false');
    setIsLoading(false);


return <Tasks title='Important Tasks' tasks={importantTasks} importantPage={true} />;
}

export default Important;