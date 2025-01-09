/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { postNewMotherURL } from '../constants';

const handleSaveNewPatient = async (patientData: Record<string, any>) => {
    // Save the new patient data (e.g., API call or update state)
    try {
        const newPatient = {
            name: patientData.name,
            age: Number(patientData.age),
            height: Number(patientData.height),
            weight: Number(patientData.weight),
            hospital: patientData.hospital,
            PreviouslyFailedPregnancy: patientData.failedPregnancyCount,
            HighRiskPreeclampsia: patientData.highRiskPreeclampsia,
            PregnancyInducedHypertension: patientData.pregnancyHypertension,
            PregestationalLDM: patientData.pregestationalLDM,
            GestationalLDM: patientData.gestationalLDM,
            Smoking: patientData.doesSmoke,
        };
        const response = await axios.post(postNewMotherURL, newPatient);
    } catch (error) {
        console.log(error);
    }
};

export const testHandleSaveNewPatient = async () => {
    const mock = new MockAdapter(axios); // Initialize axios mock adapter

    // Mock patient data for testing
    const patientData = {
        name: 'emily',
        age: '28',
        height: '165',
        weight: '60',
        hospital: 'General Hospital',
        failedPregnancyCount: 1,
        highRiskPreeclampsia: false,
        pregnancyHypertension: true,
        pregestationalLDM: false,
        gestationalLDM: false,
        doesSmoke: true,
    };

    const expectedPayload = {
        name: 'emily',
        age: 28,
        height: 165,
        weight: 60,
        hospital: 'General Hospital',
        PreviouslyFailedPregnancy: 1,
        HighRiskPreeclampsia: false,
        PregnancyInducedHypertension: true,
        PregestationalLDM: false,
        GestationalLDM: false,
        Smoking: true,
    };

    // Simulate successful API response
    mock.onPost(postNewMotherURL).reply(200, { success: true });

    console.log('--- Starting Successful Save Test ---');
    try {
        await handleSaveNewPatient(patientData); // Call the original function
        console.log('Success Test Passed: Data submitted successfully.');
    } catch (error) {
        console.error('Success Test Failed:', error);
    }

    // Simulate an error API response
    mock.onPost(postNewMotherURL).reply(500, { error: 'Internal Server Error' });

    console.log('--- Starting Error Handling Test ---');
    try {
        await handleSaveNewPatient(patientData); // Call the original function
        console.log('Error Handling Test Failed: Error was not caught correctly.');
    } catch (error) {
        console.log('Error Handling Test Passed:', error);
    }

    mock.restore(); // Restore original axios behavior
};

describe('Testing handleSaveNewPatient', () => {
    test('handles successful API call', async () => {
        await testHandleSaveNewPatient(); // Execute test function
    });
});
