import React, { useCallback, useMemo } from 'react';

import { useStepsFormDispatch } from '../context/StepsFormProvider.jsx';
import { useCustomStepInput } from './CustomStep.jsx';

const useStepButton = (variant, stepData) => {
    const { handlePrevStep, handleNext } = useStepsFormDispatch();
    const { name, validateStep } = useCustomStepInput();

    const handleClick = useCallback(
        (e) => {
            if (validateStep(stepData)) {
                variant === 'back'
                    ? handlePrevStep({ [name]: stepData })
                    : handleNext({ [name]: stepData });
            }
        },
        [handleNext, handlePrevStep, name, stepData, validateStep, variant]
    );

    const returnValue = useMemo(
        () => ({ id: `step-form-validate-${variant}-btn`, onClick: handleClick }),
        [handleClick, variant]
    );

    if (!variant || (variant !== 'back' && variant !== 'next')) {
        console.error('Please provide first parametar, options are: back or next');
        return null;
    }

    if (!stepData) {
        console.error('Please provide second paremeter: step data');
        return null;
    }

    return returnValue;
};

export default useStepButton;
