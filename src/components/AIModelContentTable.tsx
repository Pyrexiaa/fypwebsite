import React, { useState, ChangeEvent } from 'react';
import PencilIcon from '../assets/PencilIcon.png';
import { data } from '../mockdata/PastHistoryContentTableData';

export function AIModelContentTable() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Generate input fields based on the JSON data keys */}
            {data.length > 0 &&
                Object.keys(data[0]).map((key) => (
                    <div
                        key={key}
                        className="flex flex-col"
                    >
                        {/* Label for each input field */}
                        <label
                            htmlFor={key}
                            className="text-sm font-semibold mb-1 capitalize"
                        >
                            {key.replace(/([A-Z])/g, ' $1')} {/* Adds space to camelCase */}
                        </label>

                        {/* Input field */}
                        <input
                            type="text"
                            id={key}
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder={`Enter ${key}`}
                        />
                    </div>
                ))}
        </div>
    );
}
