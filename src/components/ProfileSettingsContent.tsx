import React, { useState, useEffect } from 'react';
import {
    getAuth,
    updateEmail,
    updateProfile,
    updatePassword,
    sendEmailVerification,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.{8,})/;

export function ProfileSettingsContent() {
    const auth = getAuth();
    const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
    const [email, setEmail] = useState(auth.currentUser?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrengthValid, setPasswordStrengthValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [emailVerified, setEmailVerified] = useState(false);
    const [emailVerificationSent, setEmailVerificationSent] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Validate password strength on change
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPassword(value);
        setPasswordStrengthValid(passwordStrengthRegex.test(value));
    };

    const handleSave = async () => {
        setError(null);
        setLoading(true);

        if (password && password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        if (auth.currentUser?.email !== email) {
            setError('Please verify your new email before updating.');
            setIsSaving(false);
            setLoading(false);
            return;
        }

        try {
            // Update display name
            if (displayName !== auth.currentUser?.displayName) {
                await updateProfile(auth.currentUser, { displayName });
            }

            // Update email if it is different and verified
            if (email !== auth.currentUser?.email && emailVerified) {
                await updateEmail(auth.currentUser, email);
            }

            // Update password if provided
            if (password && passwordStrengthValid) {
                await updatePassword(auth.currentUser, password);
            }

            alert('Profile updated successfully!');
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleSendVerificationEmail = async () => {
        setLoading(true);
        try {
            // Try to sign in with the new email to check if the user exists
            try {
                // await signInWithEmailAndPassword(auth, email, 'temporary-password'); // Temporary password for login
                // If sign-in succeeds, send verification email
                await sendEmailVerification(auth.currentUser!);
                setEmailVerificationSent(true);
                setError('Verification email sent. Please check your inbox.');
            } catch (errorr) {
                // If the user does not exist, create a new account
                const userCredential = await createUserWithEmailAndPassword(auth, email, 'temporary-password'); // Create user with a temporary password
                await sendEmailVerification(userCredential.user); // Send verification email for the new user
                setEmailVerificationSent(true);
                setError('Verification email sent. Please check your inbox.');
            }
        } catch (err: any) {
            setError('Error sending verification email.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // This hook will check whether the email has been verified after the verification email is sent
        if (auth.currentUser && emailVerificationSent) {
            setEmailVerified(auth.currentUser.emailVerified);
        }
    }, [emailVerificationSent]);

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Profile Settings</h2>
            <div className="space-y-6">
                {/* Display Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Display Name
                        <input
                            type="text"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </label>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                        <input
                            type="email"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    {email !== auth.currentUser?.email && !emailVerified && (
                        <div className="flex flex-row text-sm text-red-500 mt-1">
                            Your email is not verified. Please verify your email to update it.{' '}
                            {/* Verification Button */}
                            {!emailVerified && !emailVerificationSent && (
                                <button
                                    onClick={handleSendVerificationEmail}
                                    className="pl-1 text-sm text-red-500 hover:underline focus:outline-none"
                                    disabled={loading}
                                    type="button"
                                >
                                    {loading ? 'Sending Verification...' : 'Verify Now'}
                                </button>
                            )}
                        </div>
                    )}
                    {emailVerificationSent && (
                        <p className="text-sm text-blue-500 mt-1">Verification email sent. Please check your inbox.</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        New Password
                        <input
                            type="password"
                            className={`w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!passwordStrengthValid ? 'border-red-500' : ''}`}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </label>
                    <p className={`text-sm mt-1 ${passwordStrengthValid ? 'text-gray-500' : 'text-red-500'}`}>
                        Password must be at least 8 characters long, include an uppercase letter, a number, and a
                        special character.
                    </p>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                        <input
                            type="password"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                </div>

                {/* Error Message */}
                {error && <p className="text-sm text-red-500">{error}</p>}

                <p className="text-sm font-bold text-gray-500 mt-1">
                    Leave the row blank if you do not want to change that information.
                </p>

                {/* Save Button */}
                <div className="mt-6">
                    <button
                        onClick={handleSave}
                        className={`w-full py-3 text-white font-semibold rounded-md focus:outline-none ${
                            loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                        disabled={loading}
                        type="button"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
