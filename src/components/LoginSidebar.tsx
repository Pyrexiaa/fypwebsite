import React from 'react';
import { Link } from 'react-router-dom';
import LoginUserIcon from '../assets/LoginUserIcon.svg';

interface SidebarProps {
    isExpanded: boolean;
}

export function LoginSidebar({ isExpanded }: SidebarProps) {
    return (
        <aside
            className={`${
                isExpanded ? 'w-64' : 'w-0'
            } bg-sky-950 text-white min-h-screen transition-all duration-300 overflow-hidden flex-shrink-0 flex flex-col`}
        >
            <div className="flex flex-col h-screen justify-center items-center">
                {isExpanded && (
                    <div className="flex flex-col justify-between items-center p-4">
                        <img
                            src={LoginUserIcon}
                            alt="Login Icon"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <p className="text-sm text-gray-400">Administrator</p>
                    </div>
                )}
                <nav className="flex flex-col space-y-2 mt-4 w-full">
                    <Link
                        to="/login"
                        className="p-2 rounded text-center text-white bg-gray-100 bg-opacity-25 border-l-4 border-gray-300 hover:bg-gray-100 hover:text-black"
                    >
                        Login
                    </Link>
                </nav>
            </div>
        </aside>
    );
}
