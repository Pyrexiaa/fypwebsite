import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
    const [isExpanded, setIsExpanded] = useState(true);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsExpanded((prev) => !prev);
    };

    // Define titles for each route
    const pageTitles: Record<string, string> = {
        '/': 'Main Page',
        '/homepage': 'Home Page',
        '/aimodel': 'AI Model',
        '/pasthistory': 'Past History Retrieval',
        '/calculator': 'Fetal Growth Calculator',
        '/settings': 'Settings',
    };

    const currentTitle = pageTitles[location.pathname] ?? 'Unknown Page';

    return (
        <div className="flex">
            <Sidebar isExpanded={isExpanded} />
            <div className="flex flex-col flex-1">
                <Header
                    toggleSidebar={toggleSidebar}
                    title={currentTitle}
                />
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
