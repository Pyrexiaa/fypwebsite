/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { postNewMotherURL } from '../constants';

const handleSaveNewPatient = async (patientData: Record<string, any>) => {
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

describe('handleSaveNewPatient', () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    test('should send patient data successfully', async () => {
        const patientData = {
            name: 'emily',
            age: '30',
            height: '170',
            weight: '70',
            hospital: 'City Hospital',
            failedPregnancyCount: 2,
            highRiskPreeclampsia: true,
            pregnancyHypertension: false,
            pregestationalLDM: false,
            gestationalLDM: true,
            doesSmoke: false,
        };

        const expectedPayload = {
            name: 'emily',
            age: 30,
            height: 170,
            weight: 70,
            hospital: 'City Hospital',
            PreviouslyFailedPregnancy: 2,
            HighRiskPreeclampsia: true,
            PregnancyInducedHypertension: false,
            PregestationalLDM: false,
            GestationalLDM: true,
            Smoking: false,
        };

        mock.onPost(postNewMotherURL).reply(200, { success: true });

        await handleSaveNewPatient(patientData);

        expect(mock.history.post.length).toBe(1);
        expect(JSON.parse(mock.history.post[0].data)).toEqual(expectedPayload);
    });

    test('should handle API errors gracefully', async () => {
        const patientData = {
            name: 'emily',
            age: '30',
            height: '170',
            weight: '70',
            hospital: 'City Hospital',
            failedPregnancyCount: 2,
            highRiskPreeclampsia: true,
            pregnancyHypertension: false,
            pregestationalLDM: false,
            gestationalLDM: true,
            doesSmoke: false,
        };

        mock.onPost(postNewMotherURL).reply(500, { error: 'Internal Server Error' });

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        await handleSaveNewPatient(patientData);

        expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
        consoleSpy.mockRestore();
    });
});
