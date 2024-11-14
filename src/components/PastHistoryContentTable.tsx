import React, { useState, ChangeEvent } from 'react';
import PencilIcon from '../assets/PencilIcon.png';
import { data } from '../mockdata/PastHistoryContentTableData';

export function PastHistoryContentTable() {
    return (
        <table className="w-full min-w-max table-auto">
            <thead>
                <tr>
                    {/* Dynamically generate headers based on keys in the first object of data */}
                    {data.length > 0 &&
                        Object.keys(data[0]).map((key) => (
                            <th
                                key={key}
                                className="text-left px-4 py-2 capitalize"
                            >
                                {key.replace(/([A-Z])/g, ' $1')} {/* Add spaces to camelCase */}
                            </th>
                        ))}
                    <th className="text-left px-4 py-2">Actions</th> {/* Additional Actions column */}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr
                        key={item.id}
                        className="border-b"
                    >
                        {/* Dynamically generate table cells based on item values */}
                        {Object.values(item).map((value, index) => (
                            <td
                                key={item.id}
                                className="px-4 py-2"
                            >
                                {value}
                            </td>
                        ))}
                        {/* Actions column */}
                        <td className="px-4 py-2 flex space-x-2">
                            <button
                                className="bg-green-200 p-2 rounded-md"
                                type="button"
                            >
                                <img
                                    src={PencilIcon}
                                    alt="Edit Icon"
                                    className="w-5 h-5"
                                />
                            </button>
                            <button
                                className="bg-red-200 p-2 rounded-md"
                                type="button"
                            >
                                <img
                                    src={PencilIcon}
                                    alt="Delete Icon"
                                    className="w-5 h-5"
                                />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
