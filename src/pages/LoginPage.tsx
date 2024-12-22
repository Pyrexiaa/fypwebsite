import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { auth } from '../auth/firebaseConfig';
import GoogleIcon from '../assets/GoogleIcon.png';
import { Modal } from '../modals/Modal';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const showErrorModal = (message: string) => {
        setEmail('');
        setPassword('');
        setModalMessage(message);
        setShowModal(true);
    };

    const onSignUp = async (inputEmail: string, inputPassword: string) => {
        if (!inputEmail || !inputPassword) {
            showErrorModal('Please enter both email and password.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, inputEmail, inputPassword);
            console.log('Signed up successfully:', userCredential.user);
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                showErrorModal('This email is already registered. Please use a different email or log in.');
            } else {
                showErrorModal(error.message);
            }
        }
    };

    const onLogin = async (inputEmail: string, inputPassword: string) => {
        if (!inputEmail || !inputPassword) {
            showErrorModal('Please enter both email and password.');
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
            console.log('Logged in successfully:', userCredential.user);
        } catch (error: any) {
            console.log(error.code);
            if (error.code === 'auth/user-not-found') {
                showErrorModal('Email not registered. Please create an account first.');
            } else if (error.code === 'auth/wrong-password') {
                showErrorModal('Incorrect email or password. Please try again.');
            } else if (error.code === 'auth/invalid-credential') {
                showErrorModal('Incorrect email or password, please try again');
            } else if (error.code === 'auth/invalid-email') {
                showErrorModal('Please enter valid email');
            } else {
                showErrorModal(error.message);
            }
        }
    };

    const onGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const { user } = result;
            console.log('Google sign-in successful:', user);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error with Google sign-in:', error.message);
            } else {
                console.error('An unknown error occurred during Google sign-in:', error);
            }
        }
    };

    return (
        <div className="container mx-auto max-w-lg p-16 bg-white rounded-lg">
            {/* Modals */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            >
                <div className="flex flex-row justify-between items-center p-4">{modalMessage}</div>
            </Modal>

            <h1 className="text-3xl font-bold text-left">Sign In</h1>

            <div className="text-left mb-4">
                <span className="text-sm text-gray-600">or </span>
                <a
                    href="#create-account"
                    onClick={() => onSignUp(email, password)}
                    className="text-blue-500 text-sm font-semibold hover:underline"
                >
                    create an account
                </a>
            </div>

            <div className="mb-4">
                <input
                    type="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="flex items-center mb-6">
                <input
                    type="checkbox"
                    id="remember-me"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-700"
                >
                    Remember me
                </label>
            </div>

            <div className="flex flex-col gap-2">
                <button
                    onClick={() => onLogin(email, password)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                    type="button"
                >
                    Sign In
                </button>
                <button
                    onClick={onGoogleSignIn}
                    className="flex items-center justify-center bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 border rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    type="button"
                >
                    <img
                        src={GoogleIcon}
                        alt="Google Icon"
                        className="w-5 h-5 mr-2"
                    />
                    Sign in with Google
                </button>
            </div>

            <div className="mt-4 text-left">
                <a
                    href="#forgot-password"
                    onClick={() => {}}
                    className="text-blue-500 text-sm font-semibold hover:underline"
                >
                    Forgotten your password?
                </a>
            </div>
        </div>
    );
}
