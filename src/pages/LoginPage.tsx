import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { auth } from '../auth/firebaseConfig';

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
        <div className="container mx-auto max-w-sm p-4">
            <h1 className="text-3xl font-bold text-left mb-4">Sign In</h1>

            <div className="mb-4">
                <label
                    htmlFor="email-address"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Email address
                </label>
                <input
                    type="email"
                    id="email-address"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
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
                    onClick={() => onSubmit}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
                    type="button"
                >
                    Create Account
                </button>
                <button
                    onClick={onGoogleSignIn}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
                    type="button"
                >
                    Sign In with Google
                </button>
            </div>
        </div>
    );
}
