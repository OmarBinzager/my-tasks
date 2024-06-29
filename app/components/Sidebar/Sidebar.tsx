'use client';
import { UseGlobalState, UseGlobalUpdate } from '@/app/context/globalProvider';
import styled from 'styled-components';
import React from 'react';
import {menu} from '@/app/utils/menu';
import Link from 'next/link';
import { arrowLeft, bars, login, logout, user } from '@/app/utils/Icons';
import { usePathname, useRouter } from 'next/navigation';
import Button from '../Button/Button';
import Model from '../models/Model';
import UserProfile from '../models/UserProfile';

const Sidebar = () => {
    const {
        theme,
        curUserId,
        isAuth,
        userProfileModel,
        openModel,
        collapsed,
        collapseMenu,
    } = UseGlobalState();
    const { setIsAuth, setIsAuthPage } = UseGlobalUpdate();
    const router = useRouter();
    const pathname = usePathname();
    const handleClick = (link: string) => {
        router.push(link);
    };
    const users: Array<object> = JSON.parse(`${localStorage.getItem('users')}`) || [];
    const userInfo = isAuth == 'true' ? users.filter((user) => user.id == curUserId)[0] : {
        avatar: '',
        username: '',
    };
    return (
        <SidebarStyled theme={theme} collapsed={collapsed}>
            {userProfileModel && <Model content={<UserProfile />} />}
            <button className='toggle-nav' onClick={collapseMenu}>
                {collapsed ? bars : arrowLeft}
            </button>
            <div
                className='profile m-6 relative py-4 px-3 rounded-2xl cursor-pointer font-semibold flex items-center gap-4'
                onClick={() => openModel('profile')}
            >
                <div className='profile-overlay absolute top-0 left-0 w-full h-full backdrop-blur-md rounded-2xl z-0 transition-all ease-linear duration-500 opacity-0'></div>
                <div className='image z-10 max-w-16 relative flex-shrink-0 overflow-hidden inline-block transition-all ease-in-out duration-500 rounded-full'>
                    {userInfo.avatar !== '' ? (
                        <img
                            className='rounded-full w-16 h-16 max-w-16 object-cover transition-all ease-in-out duration-500'
                            src={userInfo.avatar}
                            alt='profile'
                            width={70}
                            height={70}
                        />
                    ) : (
                        <div className='flex justify-center items-center text-3xl text-default-colorFontPrimary'>
                            {user}
                        </div>
                    )}
                </div>
                <h1 className='z-10 text-lg relative'>{userInfo.username}</h1>
            </div>
            <ul className='nav-items list-none'>
                {menu.map((item) => {
                    const link = item.link;
                    return (
                        <li
                            className={`nav-item  py-2 px-4 pl-8 my-1 cursor-pointer relative ${
                                pathname === item.link ? 'active' : ''
                            }`}
                            onClick={() => handleClick(item.link)}
                        >
                            {item.icon}
                            <Link href={link}>{item.title}</Link>
                        </li>
                    );
                })}
            </ul>
            <div className='sign-out relative m-6'>
                <Button
                    name={isAuth == 'true' ? 'Sign Out' : 'Sign in'}
                    type={'submit'}
                    padding={'0.4rem 0.8rem'}
                    borderRad={'0.8rem'}
                    fw={'500'}
                    fs={'1.2rem'}
                    icon={isAuth == 'true' ? logout : login}
                    click={() => {
                        if (isAuth == 'true') {
                            setIsAuth('false');
                            localStorage.setItem('isAuth', 'false');
                        }
                        router.replace('/signin');
                    }}
                />
            </div>
        </SidebarStyled>
    );
};
const SidebarStyled = styled.nav<{ collapsed: boolean }>`
    position: relative;
    width: ${(props) => props.theme.sidebarWidth};
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: ${(props) => props.theme.colorGrey3};

    @media screen and (max-width: 768px) {
        position: fixed;
        height: calc(100vh - 2rem);
        z-index: 100;

        transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
        transform: ${(props) =>
            props.collapsed ? 'translateX(-107%)' : 'translateX(0)'};

        .toggle-nav {
            display: block !important;
        }
    }

    .toggle-nav {
        display: none;
        padding: 0.8rem 0.9rem;
        position: absolute;
        right: -48px;
        top: 1.8rem;

        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;

        background-color: ${(props) => props.theme.colorBg2};
        border-right: 2px solid ${(props) => props.theme.borderColor2};
        border-top: 2px solid ${(props) => props.theme.borderColor2};
        border-bottom: 2px solid ${(props) => props.theme.borderColor2};
    }

    .user-btn {
        .cl-rootBox {
            width: 100%;
            height: 100%;

            .cl-userButtonBox {
                width: 100%;
                height: 100%;

                .cl-userButtonTrigger {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }
        }
    }

    .profile {
        color: ${(props) => props.theme.colorGrey0};
        &:hover {
            .profile-overlay {
                opacity: 1;
            }
            img {
                scale: 1.1;
            }
        }
    }
    .profile-overlay {
        z-index: 0;
        background-color: ${(props) => props.theme.colorBg3};
        border: 2px solid ${(props) => props.theme.borderColor2};
    }
    h1 {
        line-height: 1;
    }
    .nav-item {
        display: grid;
        grid-template-columns: 40px 1fr;
        align-items: center;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            transition: all 0.3s ease-in-out;
            height: 100%;
            z-index: 1;
            background-color: ${(props) => props.theme.activeNavLinkHover};
        }
        &::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 0;
            transition: all 0.3s ease-in-out;
            height: 100%;
            z-index: 1;
            background-color: ${(props) => props.theme.colorGreenDark};
            border-bottom-left-radius: 5px;
            border-top-left-radius: 5px;
        }
        a {
            font-weight: 500;
        }
        &:hover {
            &::after {
                width: 100%;
            }
        }
    }
    .nav-item.active {
        background-color: ${(props) => props.theme.activeNavLink};

        i {
            color: ${(props) => props.theme.colorIcons2};
        }
    }
    .nav-item.active::before {
        width: 0.3rem;
    }
`;
export default Sidebar;
