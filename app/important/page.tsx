"use client";



import React from 'react'
import { useGlobalState, useGlobalUpdate } from '../context/globalProvider';
import Tasks from '../components/Tasks/Tasks';

const page = () => {

    const { setIsAuthPage } = useGlobalUpdate();
    setIsAuthPage('false');


const { importantTasks } = useGlobalState();
return <Tasks title='Important Tasks' tasks={importantTasks} importantPage={true} />;
}

export default page;