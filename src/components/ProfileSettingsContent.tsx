import React, { useState } from 'react';

export function ProfileSettingsContent() {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');

    const handleSave = () => {
        alert('Profile updated!');
    };

    return (
        <div className="p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">
                        Display Name
                        <input
                            type="text"
                            className="w-full border-gray-300 rounded-md p-2"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Email
                        <input
                            type="email"
                            className="w-full border-gray-300 rounded-md p-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    type="button"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
