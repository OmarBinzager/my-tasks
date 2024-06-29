'use client';

import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { UseGlobalState, UseGlobalUpdate } from '../context/globalProvider';
import { useRouter } from 'next/navigation';

const Signin = () => {

    const { setCurUserId } = UseGlobalUpdate();

    const router = useRouter();
    const { theme, allTasks } = UseGlobalState();
    const { setIsAuth, setIsAuthPage } = UseGlobalUpdate();
    setIsAuthPage('true');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleEmail(event:any) {
        setEmail(event.target.value);
    }
    function handlePassword(event:any) {
        setPassword(event.target.value);
    }
    const passwordErrorRef = useRef<any>();
    const emailErrorRef = useRef<any>();
    function checkUser(email: string, password: string): boolean {
        if (
            localStorage.getItem('users') &&
            passwordErrorRef.current &&
            emailErrorRef.current
        ) {
            const users = JSON.parse(`${localStorage.getItem('users')}`);
            const user = users.filter(
                (user: { email: string }) => user.email === email
            )[0];
            if (user) {
                if (user.password === password) {
                    setCurUserId(user.id);
                    localStorage.setItem('curUserId', user.id);
                    return true;
                } else {
                    passwordErrorRef.current.textContent =
                        'The password is incorrect, please try again';
                    return false;
                }
            } else {
                emailErrorRef.current.textContent = 'This email does not exist';
                return false;
            }
        } else {
            emailErrorRef.current!.textContent = 'This email does not exist';
            return false;
        }
    }
    const input =
        'w-full rounded-md mt-1 mb-3 mx-1 bg-default-colorButton p-1 focus:outline-none border-1-default-borderColor';
    const label = 'block mx-1  text-default-colorTextSecondary';
    return (
        <SigninStyled theme={theme}>
            <div className='container sm:w-96 p-6'>
                <div>
                    <h1 className='lg:text-3xl text-2xl text-left text-bold'>
                        Sign in
                    </h1>
                    <p className='text-default-colorTextSecondary text-sm'>
                        to continue to Task Manager
                    </p>
                </div>
                <div className='fields'>
                    <label className={label} htmlFor='emil'>
                        Email
                    </label>
                    <input
                        className={input}
                        type='email'
                        name='emil'
                        id='emil'
                        placeholder='example@example.com'
                        onChange={handleEmail}
                    />
                    <p className='error' ref={emailErrorRef}></p>
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
                    <p className='error' ref={passwordErrorRef}></p>
                </div>
                <div className='w-full flex justify-center items-start flex-col'>
                    <button
                        className='bg-default-colorPrimary rounded-lg shadow-sm hover:shadow-lg hover:bg-default-colorPrimary2 w-full transition-all duration-300 ease-in-out py-1.5 p-2 justify-center'
                        name='button'
                        onClick={() => {
                            const regex =
                                /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+([a-zA-Z]{2,6})$/;
                            if (!regex.test(email)) {
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
                                if (checkUser(email, password)) {
                                    localStorage.setItem('isAuth', 'true');
                                    setIsAuth('true');
                                    allTasks(true);
                                    router.replace('/');
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
                                        emailErrorRef.current!.textContent = '';
                                        passwordErrorRef.current!.classList.remove(
                                            'active'
                                        );
                                        passwordErrorRef.current!.textContent =
                                            '';
                                    }, 5000);
                                }
                            }
                        }}
                    >
                        continue
                    </button>
                    <p className='text-sm text-gray-300 pt-4'>
                        You do not have an account{' '}
                        <span
                            className='text-blue-400 cursor-pointer'
                            onClick={() => {
                                router.push('/signup');
                            }}
                        >
                            sign up
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
        height: 80%;
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
export default Signin;
