import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ToggleButton } from './ToggleButton';

export function GeneralSettingsContent() {
    // State to handle dark mode, notifications, and cookies consent
    const [darkMode, setDarkMode] = useState(() => {
        // Check if cookies are enabled and dark mode preference is set in cookies
        return JSON.parse(Cookies.get('darkMode') || 'false');
    });

    const [notifications, setNotifications] = useState(() => {
        // Check if cookies are enabled and notifications preference is set in cookies
        return JSON.parse(Cookies.get('notifications') || 'true');
    });

    const [cookiesEnabled, setCookiesEnabled] = useState(() => {
        // Check if the user has consented to cookies
        return JSON.parse(Cookies.get('cookiesAccepted') || 'false');
    });

    // Toggle dark mode for the app
    useEffect(() => {
        if (cookiesEnabled) {
            // Only save to cookies if cookies are enabled
            Cookies.set('darkMode', JSON.stringify(darkMode), { expires: 365 });
        }
        // Apply dark mode based on the state
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode, cookiesEnabled]);

    // Handle notifications mute toggle
    useEffect(() => {
        if (cookiesEnabled) {
            // Only save to cookies if cookies are enabled
            Cookies.set('notifications', JSON.stringify(notifications), { expires: 365 });
        }
    }, [notifications, cookiesEnabled]);

    // Handle cookie acceptance/decline
    const handleCookiesToggle = (enabled: boolean) => {
        setCookiesEnabled(enabled); // Update state
        localStorage.setItem('cookiesEnabled', JSON.stringify(enabled)); // Save to localStorage

        if (enabled) {
            // Accept cookies and set in Cookies storage
            Cookies.set('cookiesAccepted', 'true', { expires: 365 }); // Expires in 1 year
        } else {
            // Decline cookies and set in Cookies storage
            Cookies.set('cookiesAccepted', 'false', { expires: 365 });
            // Clear all cookie settings if cookies are disabled
            Cookies.remove('darkMode');
            Cookies.remove('notifications');
            Cookies.remove('cookiesAccepted');
        }
    };

    // Handle cookie consent UI
    useEffect(() => {
        if (cookiesEnabled) {
            console.log('Cookies are enabled.');
        } else {
            console.log('Cookies are disabled.');
        }
    }, [cookiesEnabled]);

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">General Settings</h2>
            <div className="space-y-6">
                {/* <div className="flex items-center justify-between">
                    <label
                        htmlFor="toggle-darkmode"
                        className="text-sm font-medium"
                    >
                        Enable Dark Mode
                    </label>
                    <ToggleButton
                        isChecked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        onColor="bg-blue-500"
                        offColor="bg-gray-300"
                        label="dark mode"
                    />
                </div> */}

                {/* Mute Notifications */}
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="toggle-notifications"
                        className="text-md"
                    >
                        Notifications
                    </label>
                    <ToggleButton
                        isChecked={notifications}
                        // This only ask permission, but control after is based on local storage
                        onChange={() => setNotifications(!notifications)}
                        onColor="bg-blue-500"
                        offColor="bg-gray-300"
                        label="notification"
                    />
                </div>

                {/* Enable/Disable Cookies */}
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="toggle-cookies"
                        className="text-md"
                    >
                        Enable Cookies
                    </label>
                    <ToggleButton
                        isChecked={cookiesEnabled}
                        onChange={() => handleCookiesToggle(!cookiesEnabled)}
                        onColor="bg-blue-500"
                        offColor="bg-gray-300"
                        label="cookies"
                    />
                </div>
            </div>
            {!cookiesEnabled && <p className="text-xs text-red-500">Only enabled cookies will save all settings.</p>}
        </div>
    );
}
