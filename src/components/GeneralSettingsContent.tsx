import React, { useState } from 'react';

export function GeneralSettingsContent() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
            <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">
                    Dark Mode
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        className="w-5 h-5 text-blue-600"
                    />
                </label>
            </div>
        </div>
    );
}
