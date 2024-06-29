'use client';

import React from 'react';
import { useGlobalState, useGlobalUpdate } from '../context/globalProvider';
import Tasks from '../components/Tasks/Tasks';

const page = () => {
    const { setIsAuthPage } = useGlobalUpdate();
    setIsAuthPage('false');

    var { completedTasks, isAuth } = useGlobalState();
    isAuth != 'true' ? (completedTasks = []) : completedTasks;
    return (
        <Tasks
            title='Completed Tasks'
            tasks={completedTasks}
            completePage={true}
        />
    );
};

export default page;
