import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { auth } from '../auth/firebaseConfig';
import GoogleIcon from '../assets/GoogleIcon.png';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const { user } = userCredential;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    };

    const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const { user } = userCredential;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
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
            <h1 className="text-3xl font-bold text-left">Sign In</h1>

            <div className="text-left mb-4">
                <span className="text-sm text-gray-600">or </span>
                <a
                    href="#create-account"
                    onClick={() => {}}
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
                    onClick={() => onLogin}
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
