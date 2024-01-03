import React from 'react';

import { useStepsFormDispatch, useStepsFormState } from '../context/StepsFormProvider.jsx';

const CustomStep = ({ input: { Comp }, currentStep }) => {
    const { handleNext, handlePrevStep, handleSubmit } = useStepsFormDispatch();
    const { finalData, activeStep } = useStepsFormState();

    if (!Comp) return null;

    return (
        <Comp
            options={{
                finalData,
                handleSubmit,
                handlePrevStep,
                handleNext,
                currentStep,
                activeStep,
            }}
        />
    );
};

export default CustomStep;
