'use client';

import { useGlobalState, useGlobalUpdate } from '@/app/context/globalProvider';
import { add, help } from '@/app/utils/Icons';
import React, { useEffect, useState } from 'react';
import toast, { ToastIcon } from 'react-hot-toast';
import styled from 'styled-components';
import Button from '../Button/Button';

function CreateContent({
    t = '',
    d = '',
    dat = '',
    isImportant = false,
    isCompleted = false,
    createdAt = '',
    id = '',
}: any) {
    const [title, setTitle] = useState(t);
    const [description, setDescription] = useState(d);
    const [date, setDate] = useState(dat);
    const [completed, setCompleted] = useState(isCompleted);
    const [important, setImportant] = useState(isImportant);
    const {
        isAuth,
        curUserId,
        allTasks,
        theme,
        closeModel,
        setTask,
        updateTask,
        curTask
    } = useGlobalState();

    let buttonText = 'Create Task';
    if (t != '' && d != '' && dat != '') {
        buttonText = 'Save';
    }
    let headerText = 'Create a Task';
    if (t != '' && d != '' && dat != '') {
        headerText = 'Edit Task';
    }
    function setDefault() {
        setTitle('');
        setDescription('');
        setDate('');
        setCompleted(false);
        setImportant(false);
        buttonText = 'Create Task';
        headerText = 'Create a Task';
    }
    function handleTitleChange(event: any) {
        setTitle(event.target.value);
    }
    function handleDescriptionChange(event: any) {
        setDescription(event.target.value);
    }
    function handleDateChange(event: any) {
        setDate(event.target.value);
    }
    function handleImportantChange(event: any) {
        setImportant(event.target.checked);
    }
    function handleCompletedChange(event: any) {
        setCompleted(event.target.checked);
    }
    function updateTaskInfo() {
        const task = {
            id: id,
            title: title,
            description: description,
            date: date,
            completed: completed,
            important: important,
            userId: curUserId,
            createdAt: createdAt,
            updatedAt: new Date(Date.now()).toISOString(),
        };
        setTask(null);
        updateTask(task);
        setDefault();
        closeModel('createTask');
    }
    function handleSubmit(event: any) {
        event.preventDefault();
        if (isAuth == 'false') {
            toast('You must be logged in first.', {
                icon: help,
            });
            return;
        }
        if (title.length > 0 && description.length > 0 && date !== '') {
            if (t != '' && d != '' && dat != '') {
                updateTaskInfo();
                return;
            }
            if (!localStorage.getItem('taskId')) {
                localStorage.setItem('taskId', `0`);
            }
            const task = {
                id: parseInt(`${localStorage.getItem('taskId')}`),
                title: title,
                description: description,
                date: date,
                completed: completed,
                important: important,
                userId: curUserId,

                createdAt: new Date(Date.now()).toISOString(),
                updatedAt: new Date(Date.now()).toISOString(),
            };
            const tasks: Array<object> =
                JSON.parse(`${localStorage.getItem('tasks')}`) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            localStorage.setItem(
                'taskId',
                `${parseInt(`${localStorage.getItem('taskId')}`) + 1}`
            );
            allTasks();
            setDefault();
            toast.success('Task created successfully');
            closeModel('createTask');
        } else {
            toast.error('There are Fields Empty');
        }
    }

    return (
        <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
            <h1>{headerText}</h1>
            <div className='input-control'>
                <label htmlFor='title'>Title</label>
                <input
                    type='text'
                    name='title'
                    id='title'
                    value={title}
                    onChange={handleTitleChange}
                    placeholder='e.g, Wach video from Fireship'
                />
            </div>
            <div className='input-control'>
                <label htmlFor='description'>Description</label>
                <textarea
                    name='description'
                    id='description'
                    rows={4}
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder='e.g, Wach a video about Next.js Auth'
                />
            </div>
            <div className='input-control'>
                <label htmlFor='date'>Date</label>
                <input
                    type='date'
                    name='date'
                    id='date'
                    value={date}
                    onChange={handleDateChange}
                />
            </div>
            <div className='input-control toggler'>
                <label htmlFor='completed'>Completed</label>
                <input
                    type='checkbox'
                    name='completed'
                    id='completed'
                    checked={completed}
                    onChange={handleCompletedChange}
                />
            </div>
            <div className='input-control toggler'>
                <label htmlFor='important'>Important</label>
                <input
                    type='checkbox'
                    name='important'
                    id='important'
                    checked={important}
                    onChange={handleImportantChange}
                />
            </div>
            <div className='submit-btn flex justify-end'>
                <Button
                    type='submit'
                    name={buttonText}
                    icon={add}
                    padding={'0.8rem 2rem'}
                    borderRad={'0.8rem'}
                    fw={'500'}
                    fs={'1.2rem'}
                    background={'rgb(0, 163, 255)'}
                />
            </div>
        </CreateContentStyled>
    );
}

const CreateContentStyled = styled.form`
    > h1 {
        font-size: clamp(1.2rem, 5vw, 1.6rem);
        font-weight: 600;
    }

    color: ${(props) => props.theme.colorGrey1};

    .input-control {
        position: relative;
        margin: 1.6rem 0;
        font-weight: 500;

        @media screen and (max-width: 450px) {
            margin: 1rem 0;
        }

        label {
            margin-bottom: 0.5rem;
            display: inline-block;
            font-size: clamp(0.9rem, 5vw, 1.2rem);

            span {
                color: ${(props) => props.theme.colorGrey3};
            }
        }

        input,
        textarea {
            width: 100%;
            padding: 1rem;

            resize: none;
            background-color: ${(props) => props.theme.colorGreyDark};
            color: ${(props) => props.theme.colorGrey2};
            border-radius: 0.5rem;
        }
    }

    .submit-btn button {
        transition: all 0.35s ease-in-out;

        @media screen and (max-width: 500px) {
            font-size: 0.9rem !important;
            padding: 0.6rem 1rem !important;

            i {
                font-size: 1.2rem !important;
                margin-right: 0.5rem !important;
            }
        }

        i {
            color: ${(props) => props.theme.colorGrey0};
        }

        &:hover {
            background: ${(props) => props.theme.colorPrimaryGreen} !important;
            color: ${(props) => props.theme.colorWhite} !important;
        }
    }

    .toggler {
        display: flex;
        align-items: center;
        justify-content: space-between;

        cursor: pointer;

        label {
            flex: 1;
        }

        input {
            width: initial;
        }
    }
`;
export default CreateContent;
