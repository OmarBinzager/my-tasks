'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { UseGlobalState, UseGlobalUpdate } from '../context/globalProvider';
import { useRouter } from 'next/navigation';
import { camera } from '../utils/Icons';
const Signup = () => {
    const { theme, setIsLoading } = UseGlobalState();
    setIsLoading(true);
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');

    const { setIsAuthPage } = UseGlobalUpdate();
    setIsAuthPage('true');


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
            }
        }
    }
    const passwordErrorRef = useRef<any>(null);
    const emailErrorRef = useRef<any>(null);
    const usernameErrorRef = useRef<any>(null);

    function createUser(username: string, email: string, password: string, avatat: string): boolean {
        var users: Array<any> = [];
        if (localStorage.getItem('users')) {
            users = JSON.parse(
                `${localStorage.getItem('users')}`
            ) as Array<any>;
        }
        if (users.filter((user) => user.email === email)[0] !== undefined) {
            emailErrorRef.current!.textContent =
                'This email already exist, try another email';
            return false;
        }
        if (password.length < 8) {
            passwordErrorRef.current!.textContent =
                'The password must be at least 8 characters long';
            return false;
        } else {
            const user = {
                id: users.length,
                username: username,
                email: email,
                password: password,
                avatar: avatat,
            }
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return true;
        }
    }
    const input =
        'w-full rounded-md mt-1 mb-3 mx-1 bg-default-colorButton p-1 focus:outline-none border-1-default-borderColor';
    const label = 'block mx-1  text-default-colorTextSecondary';
    setIsLoading(false);
    return (
        <SigninStyled theme={theme}>
            <div className='container sm:w-96 p-6'>
                <div>
                    <h1 className='lg:text-3xl md:text-2xl text-xl text-left text-bold'>
                        Create your account
                    </h1>
                    <p className='text-default-colorTextSecondary text-sm'>
                        to continue to Task Manager
                    </p>
                </div>
                <div className='img-cont flex justify-center items-center p-4'>
                    <div className='image w-20 max-w-20 h-20 rounded-full flex overflow-hidden justify-center items-center bg-default-colorButton'>
                        <input
                            type='file'
                            name='avatar'
                            id='avatar'
                            onChange={handleAvatar}
                            className=' w-20 max-w-20 h-20 rounded-full object-cover opacity-0 z-20 absolute'
                        />
                        {avatar !== '' ? (
                            <img
                                src={avatar}
                                alt='avatar'
                                className=' w-20 max-w-20 h-20 rounded-full object-cover z-30'
                            />
                        ) : (
                            <div className='text-default-colorBg4 text-xl'>
                                {camera}
                            </div>
                        )}
                    </div>
                </div>
                <div className='fields'>
                    <label className={label} htmlFor='username'>
                        Username
                    </label>
                    <input
                        className={input}
                        type='text'
                        name='username'
                        id='username'
                        placeholder='john maclaren'
                        onChange={handleUsername}
                    />
                    <p className='error' ref={usernameErrorRef}>
                        {' '}
                    </p>
                    <label className={label} htmlFor='email'>
                        Email
                    </label>
                    <input
                        className={input}
                        type='email'
                        name='email'
                        id='email'
                        placeholder='example@example.com'
                        onChange={handleEmail}
                    />
                    <p className='error' ref={emailErrorRef}>
                        {' '}
                    </p>
                    <label className={label} htmlFor='password'>
                        Password
                    </label>
                    <input
                        className={input}
                        type='password'
                        name='password'
                        id='password'
                        placeholder='12345678'
                        onChange={handlePassword}
                    />
                    <p className='error' ref={passwordErrorRef}>
                        {' '}
                    </p>
                </div>
                <div className='w-full flex justify-center items-start flex-col'>
                    <button
                        className='bg-default-colorPrimary rounded-lg shadow-sm hover:shadow-lg hover:bg-default-colorPrimary2 w-full transition-all duration-300 ease-in-out py-1.5 p-2 justify-center'
                        name='button'
                        onClick={() => {
                            const regex =
                                /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+([a-zA-Z]{2,6})$/;
                            if (username === '') {
                                usernameErrorRef.current!.textContent =
                                    'Please fill the username field!';
                                usernameErrorRef.current!.classList.add(
                                    'active'
                                );
                                setTimeout(() => {
                                    usernameErrorRef.current!.classList.remove(
                                        'active'
                                    );
                                    usernameErrorRef.current!.textContent = '';
                                }, 5000);
                            } else if (!regex.test(email)) {
                                emailErrorRef.current!.textContent =
                                    'Your Email is not vaild!';
                                emailErrorRef.current!.classList.add('active');
                                setTimeout(() => {
                                    emailErrorRef.current!.classList.remove(
                                        'active'
                                    );
                                    emailErrorRef.current!.textContent = '';
                                }, 5000);
                            } else if (password === '') {
                                passwordErrorRef.current!.textContent =
                                    'Please fill the password field!';
                                passwordErrorRef.current!.classList.add(
                                    'active'
                                );
                                setTimeout(() => {
                                    passwordErrorRef.current!.classList.remove(
                                        'active'
                                    );
                                    passwordErrorRef.current!.textContent = '';
                                }, 5000);
                            } else {
                                if (
                                    createUser(
                                        username,
                                        email,
                                        password,
                                        avatar
                                    )
                                ) {
                                    router.push('/signin');
                                } else {
                                    emailErrorRef.current!.classList.add(
                                        'active'
                                    );
                                    passwordErrorRef.current!.classList.add(
                                        'active'
                                    );
                                    setTimeout(() => {
                                        emailErrorRef.current!.classList.remove(
                                            'active'
                                        );
                                        passwordErrorRef.current!.classList.remove(
                                            'active'
                                        );
                                        passwordErrorRef.current!.textContent =
                                            '';
                                        emailErrorRef.current!.textContent = '';
                                    }, 5000);
                                }
                            }
                        }}
                    >
                        continue
                    </button>
                    <p className='text-sm text-gray-300 pt-4'>
                        You have an account{' '}
                        <span
                            className='text-blue-400 cursor-pointer'
                            onClick={() => {
                                router.push('/signin');
                            }}
                        >
                            sign in
                        </span>
                    </p>
                </div>
            </div>
        </SigninStyled>
    );
};
const SigninStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 2rem;

    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 90%;
        position: relative;
        background-color: ${(props) => props.theme.colorBg2};
        border: 2px solid ${(props) => props.theme.borderColor2};
        border-radius: 1rem;

        .error {
            color: red;
            display: block;
            opacity: 0;
            font-size: 10px;
            margin-left: 0.25rem;
            margin-bottom: 0.5rem;
            margin-top: -0.5rem;
            transition: all 0.3s ease-in-out;
        }
        .error.active {
            opacity: 1;
        }
    }
`;
export default Signup;
