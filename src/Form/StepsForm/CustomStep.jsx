import React from 'react';

import { useStepsFormDispatch, useStepsFormState } from '../context/StepsFormProvider.jsx';

const CustomStep = ({ input: { Comp } }) => {
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
