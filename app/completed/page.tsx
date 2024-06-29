'use client';

import React from 'react';
import { UseGlobalState, UseGlobalUpdate } from '../context/globalProvider';
import Tasks from '../components/Tasks/Tasks';

const Completed = () => {
    var { completedTasks, isAuth, setIsLoading } = UseGlobalState();
    setIsLoading(true);
    const { setIsAuthPage } = UseGlobalUpdate();
    setIsAuthPage('false');

    isAuth != 'true' ? (completedTasks = []) : completedTasks;
    setIsLoading(false);
    return (
        <Tasks
            title='Completed Tasks'
            tasks={completedTasks}
            completePage={true}
        />
    );
};

export default Completed;
