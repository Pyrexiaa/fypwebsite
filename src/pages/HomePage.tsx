import React from 'react';
import { WhiteCard, BlueCard } from '../components/Card';

export function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section */}
            <header className="text-center py-16">
                <h1 className="text-4xl font-bold text-blue-900">Welcome to the Fetal Growth Platform</h1>
                <p className="text-lg text-gray-700 mt-4">
                    Empowered by Machine Learning to Assist in Predicting SGA and AGA Babies
                </p>
                <button
                    className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700"
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    type="button"
                >
                    Get Started
                </button>
            </header>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <h2 className="text-3xl font-bold text-center text-blue-900">Explore Our Core Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12 px-4">
                    {/* Feature 1 */}
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg">
                        <img
                            src="path_to_calculator_image.jpg" // Replace with actual image
                            alt="Fetal Growth Calculator"
                            className="w-full h-40 object-cover rounded"
                        />
                        <h3 className="text-xl font-bold text-blue-900 mt-4">Fetal Growth Calculator</h3>
                        <p className="text-gray-700 mt-2">
                            Visualize growth trends by comparing estimated fetal weights across multiple guidelines.
                        </p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            type="button"
                        >
                            Try the Calculator
                        </button>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg">
                        <img
                            src="path_to_ai_model_image.jpg" // Replace with actual image
                            alt="AI Model"
                            className="w-full h-40 object-cover rounded"
                        />
                        <h3 className="text-xl font-bold text-blue-900 mt-4">AI Model</h3>
                        <p className="text-gray-700 mt-2">
                            Use trained ML models to predict SGA and access related guidelines for reference.
                        </p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            type="button"
                        >
                            Use AI Model
                        </button>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg">
                        <img
                            src="path_to_history_image.jpg" // Replace with actual image
                            alt="Past History Retrieval"
                            className="w-full h-40 object-cover rounded"
                        />
                        <h3 className="text-xl font-bold text-blue-900 mt-4">Past History Retrieval</h3>
                        <p className="text-gray-700 mt-2">
                            Retrieve and visualize patients details and predictions over time.
                        </p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            type="button"
                        >
                            View Patient History
                        </button>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-blue-100">
                <h2 className="text-3xl font-bold text-center text-blue-900">Why Choose This Platform?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-12 px-4">
                    {[
                        { icon: '💡', text: 'Enhanced Accuracy' },
                        { icon: '🤖', text: 'AI-Driven Insights' },
                        { icon: '📊', text: 'Comprehensive Data' },
                        { icon: '⏱️', text: 'Time-Saving Workflows' },
                    ].map((benefit) => (
                        <div
                            key={benefit.text}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg text-center"
                        >
                            <div className="text-4xl">{benefit.icon}</div>
                            <p className="mt-4 text-lg font-semibold text-blue-900">{benefit.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action Section */}
            <footer className="text-center py-12 bg-white">
                <h2 className="text-3xl font-bold text-blue-900">Get Started Today</h2>
                <p className="text-lg text-gray-700 mt-2">
                    Revolutionize Fetal Growth Monitoring with Our Comprehensive Platform
                </p>
                <div className="mt-12 text-gray-600">
                    <p className="text-sm">
                        Final Year Project by <strong>Lim Jia Yu</strong>, Undergraduate
                    </p>
                    <p className="text-sm">
                        Supervised by <strong>Dr. Saw Shier Nee</strong>
                    </p>
                    <p className="text-sm">
                        Faculty of Computer Science and Information Technology,
                        <strong> Universiti Malaya, Malaysia</strong>
                    </p>
                    <p className="text-sm mt-4">
                        In collaboration with <strong>Universiti Malaya Medical Center</strong>, Malaysia and
                        <strong> AMMA Center for Diagnosis and Preventive Medicine Pvt Ltd</strong>, Kochi, Kerala,
                        India
                    </p>
                    <p className="text-sm mt-2">
                        Academic Year: <strong>2024/2025</strong>
                    </p>
                </div>
            </footer>
        </div>
    );
}
