"use client";

import { useGlobalState } from '@/app/context/globalProvider';
import React from 'react'
import styled from 'styled-components';
import { edit, trash } from '@/app/utils/Icons'
import formatDate from '@/app/utils/formatDate';
// interface Props {
//     title: string,
//     description: string,
//     date: string,
//     completed: boolean,
//     id: string,
//     important: boolean,
//     createdAt: string,
//     updatedAt: string,
// }


function Task(task: any) {
    const { title, description, date, completed, id } = task.task;
    const { theme, deleteTask, updateTask, openModel } = useGlobalState();

  return (
    <TaskItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date mt-auto">{formatDate(date)}</p>
      <div className="task-footer">
        {completed ? (
          <button
            className="completed"
            onClick={() => {
                task.task.completed = false;
                task.task.updatedAt = new Date(Date.now()).toISOString();
              updateTask(task.task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
                task.task.completed = true;
                task.task.updatedAt = new Date(Date.now()).toISOString();
                updateTask(task.task);
            }}
          >
            Incomplete
          </button>
        )}
        <button className="edit ml-auto"
          onClick={() => {
            openModel('createTask', task.task)
          }}
        >{edit}</button>
        <button
          className="delete"
          onClick={() => {
            deleteTask(id);
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;


  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;

export default Task