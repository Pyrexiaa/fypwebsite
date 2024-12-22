import React from 'react';

interface ToggleButtonProps {
    isChecked: boolean;
    onChange: (boolean: boolean) => void;
    onColor: string;
    offColor: string;
    label: string;
}

export function ToggleButton({
    isChecked,
    onChange,
    onColor = 'bg-blue-500',
    offColor = 'bg-gray-300',
    label,
}: ToggleButtonProps) {
    return (
        <div className="flex items-center space-x-2">
            <button
                aria-pressed={isChecked} // Indicates the current state of the toggle
                onClick={() => onChange(!isChecked)} // Corrected: directly call onChange when clicked
                className={`w-16 h-8 flex items-center rounded-full p-1 transition-colors ${
                    isChecked ? onColor : offColor
                }`}
                type="button"
                aria-label={label} // Accessibility: provide a label for screen readers
            >
                <div
                    className={`w-8 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                        isChecked ? 'translate-x-6' : 'translate-x-0'
                    }`}
                />
            </button>
        </div>
    );
}
