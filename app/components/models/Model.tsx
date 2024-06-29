'use client';

import { UseGlobalState } from '@/app/context/globalProvider';
import styled from 'styled-components';

interface Props {
    content: React.ReactNode;
}

function Model({ content }: Props) {
    const { closeModel, theme, setTask } = UseGlobalState();

    return (
        <ModelStyled theme={theme}>
            <div
                className='Model-overlay'
                onClick={() => {
                    closeModel('createTask');
                    closeModel('profile');
                    setTask(null);
                }}
            ></div>
            <div className='Model-content'>{content}</div>
        </ModelStyled>
    );
}

const ModelStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: center;

    .Model-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.45);
        filter: blur(4px);
    }

    .Model-content {
        margin: 0 1rem;

        padding: 2rem;
        position: relative;
        max-width: 630px;
        width: 100%;
        z-index: 100;

        border-radius: 1rem;
        background-color: ${(props) => props.theme.colorBg2};
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
        border-radius: ${(props) => props.theme.borderRadiusMd2};

        @media screen and (max-width: 450px) {
            font-size: 90%;
        }
    }
`;

export default Model;
