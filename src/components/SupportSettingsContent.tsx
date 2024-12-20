import React, { useState } from 'react';

interface FAQProps {
    question: string;
    answer: string;
}

function FAQ({ question, answer }: FAQProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button
                className="w-full text-left flex justify-between items-center py-3 border-b"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <span className="text-gray-500">+</span>
            </button>
            {isOpen ? (
                <div className="visible p-4 text-gray-700">{answer}</div>
            ) : (
                <div className="hidden p-4 text-gray-700">{answer}</div>
            )}
        </div>
    );
}

const FAQDict = {
    'How do I reset my password?': 'Click on Forgot Password on the login page and follow the instructions.',
    'How do I contact support?': 'Email us at support@example.com for assistance.',
    'How do I enable dark mode?': 'Go to General Settings and toggle the dark mode option.',
};

export function SupportSettingsContent() {
    return (
        <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Support</h2>
            <div className="space-y-2">
                {Object.entries(FAQDict).map(([question, answer]) => (
                    <FAQ
                        key={question}
                        question={question}
                        answer={answer}
                    />
                ))}
            </div>
        </div>
    );
}
