export default {
    preset: 'ts-jest', // Use ts-jest preset to handle TypeScript
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Handle TypeScript files
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treat TS files as ES modules
    globals: {
        'ts-jest': {
            useESM: true, // Enable ESM support in ts-jest
        },
    },
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Optional: if you're using CSS modules or similar
    },
};

export {};
