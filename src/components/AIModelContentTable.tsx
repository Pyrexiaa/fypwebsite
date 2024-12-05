import React, { useState, ChangeEvent } from 'react';
import PencilIcon from '../assets/PencilIcon.png';

const dataTemplate = [
    {
        PatientId: 1,
        MaternalAge: 1,
        MaternalHeight: 1,
        MaternalWeight: 1,
        Gender: 1,
        PregnancyInducedHypertension: 1,
        EssentialHypertension: 1,
        PregstationalDiabetes: 1,
        GestationalDiabetes: 1,
        Smoking: 1,
        PlacentaSite: 1,
        AmnioticFluid: 1,
        LastPregnancySga: 1,
        LastPregnancyFgr: 1,
        LastPregnancyNormal: 1,
        PreviousFailedPregnancy: 1,
        HighRiskPretermPreeclampsia: 1,
        GestationalAge: 1,
        BiparietalDiameter: 1,
        HeadCircumference: 1,
        AbdominalCircumference: 1,
        FemurLength: 1,
        AmnioticFluidIndex: 1,
        UterineArteryResistanceIndex: 1,
        UterineArteryPulsatilityIndex: 1,
        CerebroplacentalRatio: 1,
        MiddleCerebralArteryPeakSystolicVelocity: 1,
        EstimatedFetalWeight: 1,
        UmbilicalArterialPulsatilityIndex: 1,
    },
];

export function AIModelContentTable() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mr-2">
            {/* Generate input fields based on the JSON data keys */}
            {dataTemplate.length > 0 &&
                Object.keys(dataTemplate[0]).map((key) => (
                    <div
                        key={key}
                        className="flex flex-col h-24 justify-between"
                    >
                        {/* Label for each input field */}
                        <label
                            htmlFor={key}
                            className="text-sm font-semibold mb-1 capitalize break-words"
                        >
                            {key.replace(/([A-Z])/g, ' $1')} {/* Adds space to camelCase */}
                        </label>

                        {/* Input field */}
                        <input
                            type="text"
                            id={key}
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter Value"
                        />
                    </div>
                ))}
        </div>
    );
}
