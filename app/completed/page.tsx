'use client';

import React from 'react';
import { UseGlobalState, UseGlobalUpdate } from '../context/globalProvider';
import Tasks from '../components/Tasks/Tasks';

const page = () => {
    const { setIsAuthPage } = UseGlobalUpdate();
    setIsAuthPage('false');

    var { completedTasks, isAuth } = UseGlobalState();
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
