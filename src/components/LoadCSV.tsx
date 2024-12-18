import Papa from 'papaparse';

export interface CentileData {
    GA: number;
    '2.5': number;
    '5': number;
    '10': number;
    '25': number;
    '50': number;
    '75': number;
    '90': number;
    '95': number;
    '97.5': number;
}

// Function to load CSV data from the public folder
export const loadCSVData = async (csv_path: string): Promise<CentileData[]> => {
    const response = await fetch(csv_path);
    const csv = await response.text();

    return new Promise((resolve, reject) => {
        Papa.parse(csv, {
            header: true,
            dynamicTyping: true,
            complete: (result) => resolve(result.data as CentileData[]),
            error: (error: Error) => reject(error),
        });
    });
};
