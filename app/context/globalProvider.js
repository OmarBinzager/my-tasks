'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import themes from './themes';
import toast from 'react-hot-toast';
import { help } from '@/app/utils/Icons';

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
    // const { user } = useUser();

    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isAuth, setIsAuth] = useState(
        localStorage.getItem('isAuth') || 'false'
    );
    var [curUserId, setCurUserId] = useState(
        +localStorage.getItem('curUserId') || 0
    );
    const [curTask, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthPage, setIsAuthPage] = useState(false);
    const [createTaskModel, setTaskModel] = useState(false);
    const [userProfileModel, setProfileModel] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    if (!localStorage.tasks) localStorage.setItem('tasks', JSON.stringify([]));
    const [tasks, setTasks] = useState(
        isAuth == 'true'
            ? (JSON.parse(`${localStorage.tasks}`) || [])
                  .filter((t) => t.userId == curUserId)
                  .sort((a, b) => {
                      return (
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
                      );
                  })
            : []
    );

    const theme = themes[selectedTheme];

    const openModel = (key = 'profile' || 'createTask', task = undefined) => {
        task ? setTask(task) : '';
        switch (key) {
            case 'profile':
                isAuth == 'true'
                    ? setProfileModel(true)
                    : toast('You must be logged in first.', {
                          icon: help,
                      });
                break;
            case 'createTask':
                isAuth == 'true'
                    ? setTaskModel(true)
                    : toast('You must be logged in first.', {
                          icon: help,
                      });
        }
    };

    const closeModel = (key = 'profile' || 'createTask') => {
        switch (key) {
            case 'profile':
                setProfileModel(false);
                break;
            case 'createTask':
                setTaskModel(false);
        }
    };

    const collapseMenu = () => {
        setCollapsed(!collapsed);
    };

    function allTasks(sure = false) {
        if (!sure) {
            if (isAuth != 'true') return;
        }
        setIsLoading(true);
        if (localStorage.tasks) {
            const res = (JSON.parse(`${localStorage.tasks}`) || []).sort(
                (a, b) => {
                    return (
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    );
                }
            );
            const sorted = res.filter((task) => task.userId === curUserId);
            setTasks(sorted);
            setIsLoading(false);
        }
    }

    const deleteTask = (id) => {
        if (localStorage.tasks) {
            const res = JSON.parse(`${localStorage.tasks}`);
            res.map((r, i) => {
                if (r.id == id) {
                    res.splice(i, 1);
                }
            });
            localStorage.setItem('tasks', JSON.stringify(res));
            toast.success('Task deleted');

            allTasks();
        }
    };

    const updateTask = (task) => {
        if (localStorage.tasks) {
            const res = JSON.parse(`${localStorage.tasks}`);
            res.map((r, i) => {
                if (r.id == task.id) {
                    res.splice(i, 1, task);
                }
            });
            localStorage.setItem('tasks', JSON.stringify(res));
            toast.success('Task updated');
            allTasks();
        }
    };
    const completedTasks =
        isAuth == 'true' ? tasks.filter((task) => task.completed === true) : [];
    const importantTasks =
        isAuth == 'true' ? tasks.filter((task) => task.important === true) : [];
    const incompleteTasks =
        isAuth == 'true'
            ? tasks.filter((task) => task.completed === false)
            : [];

    useEffect(() => {
        allTasks();
    }, [curUserId]);

    return (
        <GlobalContext.Provider
            value={{
                curTask,
                setTask,
                theme,
                isAuth,
                isAuthPage,
                curUserId,
                tasks,
                isLoading,
                setIsLoading,
                setSelectedTheme,
                selectedTheme,
                deleteTask,
                completedTasks,
                importantTasks,
                incompleteTasks,
                updateTask,
                userProfileModel,
                createTaskModel,
                openModel,
                closeModel,
                allTasks,
                collapsed,
                collapseMenu,
            }}
        >
            <GlobalUpdateContext.Provider
                value={{
                    setSelectedTheme,
                    setIsAuth,
                    setIsAuthPage,
                    setCurUserId,
                }}
            >
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const UseGlobalState = () => useContext(GlobalContext);
export const UseGlobalUpdate = () => useContext(GlobalUpdateContext);
