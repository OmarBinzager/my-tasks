"use client"


import { UseGlobalState } from '@/app/context/globalProvider';
import { add, camera } from '@/app/utils/Icons';
import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import Button from '../Button/Button';
import toast from 'react-hot-toast';

function UserProfile() {
    const { theme, curUserId, closeModel } = UseGlobalState();
    const user = JSON.parse(`${localStorage.getItem('users')}`).filter(
        (user:any) => user.id == curUserId
    )[0];

    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [username, setUsername] = useState(user.username);
    const [avatar, setAvatar] = useState(user.avatar);

    function handleEmail(event: any) {
        setEmail(event.target.value);
    }
    function handlePassword(event: any) {
        setPassword(event.target.value);
    }
    function handleUsername(event: any) {
        setUsername(event.target.value);
    }
    function handleAvatar(event: any) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = () => {
                setAvatar(`${reader.result}`);
            };
        }
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        const regex =/^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+([a-zA-Z]{2,6})$/;
        if (!regex.test(email)) { 
            toast.error(`Invalid email`);
            return;
        }
        if (password.length < 8) {
            toast.error(`your password must be at least 8 characters`);
            return;
        }
        const users = JSON.parse(`${localStorage.getItem('users')}`);
        console.log(users[0]);
        const user = {
            id: curUserId,
            username: username,
            email: email,
            password: password,
            avatar: avatar
        };
        console.log(user);
        console.log(curUserId);
        users.map((u: any, i:any) => {
            if (u.id == curUserId) {
                users.splice(i, 1, user);
                console.log(users[i])
            }
        });
        localStorage.setItem('users', JSON.stringify(users));
        toast.success(`Your account has been updated`);
        closeModel('profile');
    }

    return (
        <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
            <h1>Account</h1>
            <p className='text-default-colorTextSecondary'>Manage your account information</p>
            <div className='img-cont flex justify-center items-center p-4'>
                <div className='image w-28 max-w-28 h-28 rounded-full mx-6 flex overflow-hidden justify-center items-center bg-default-colorButton'>
                    <input
                        type='file'
                        name='avatar'
                        id='avatar'
                        onChange={handleAvatar}
                        className=' w-28 max-w-28 h-28 rounded-full object-cover opacity-0 z-40 absolute'
                    />
                    {avatar !== '' ? (
                        <img
                            src={avatar}
                            alt='avatar'
                            className=' w-28 max-w-28 h-28 rounded-full object-cover z-30'
                        />
                    ) : (
                        <div className='text-default-colorBg4 text-xl'>
                            {camera}
                        </div>
                    )}
                </div>
            </div>
            <div className='input-control'>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    value={username}
                    onChange={handleUsername}
                />
            </div>
            <div className='input-control'>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={handleEmail}
                />
            </div>
            <div className='input-control'>
                <label htmlFor='password'>Password</label>
                <input
                    type='text'
                    name='password'
                    id='password'
                    value={password}
                    onChange={handlePassword}
                />
            </div>
            <div className='submit-btn flex justify-end'>
                <Button
                    type='submit'
                    name='Save'
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
`;
export default UserProfile