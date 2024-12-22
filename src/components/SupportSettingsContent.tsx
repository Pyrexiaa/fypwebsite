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
    'How can I reset my password?':
        'To reset your password, click on the "Forgot Password" link on the login page and follow the instructions provided.',
    'How can I contact support?':
        'For any assistance or inquiries, please email us at U2102820@siswa.edu.my. Our support team will respond promptly.',
    'How can I enable dark mode?':
        'Navigate to the General Settings section and toggle the "Dark Mode" option to enable or disable it.',
    'What is the purpose of the Fetal Growth Calculator Page?':
        'The Fetal Growth Calculator allows users to input gestational age and estimated fetal weight to determine the percentile of the weight using multiple standards (WHO, Hadlock, and Intergrowth-21st). This provides a comprehensive comparison to assess the likelihood of Small-for-Gestational Age (SGA) classification.',
    'Why is retrieving patient ID necessary on the AI Model Page?':
        'Retrieving the patient ID ensures that existing patient data is available. The AI model can only be utilized when the maternal ID is registered within the system.',
    'What functionality does the AI Model Page provide?':
        'The AI Model Page accepts both required and optional patient data, imputes missing optional information when necessary, and predicts the health status of preterm infants based on the input provided.',
    'What does the Past History Retrieval feature do?':
        'The Past History Retrieval feature allows users to monitor the growth and development of preterm infants and view predictions across different gestational ages for a comprehensive understanding of the baby’s progress.',
};

export function SupportSettingsContent() {
    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Support</h2>
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
