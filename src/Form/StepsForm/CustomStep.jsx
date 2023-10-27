import React from 'react';

import { useStepsFormDispatch, useStepsFormState } from '../context/StepsFormProvider';

const CustomStep = ({ Comp }) => {
    const { handleNext, handlePrevStep, handleSubmit } = useStepsFormDispatch();
    const { finalData } = useStepsFormState();

    if (!Comp) return null;

    return (
        <Comp
            options={{
                finalData,
                handleSubmit,
                handlePrevStep,
                handleNext,
            }}
        />
    );
};

export default CustomStep;
