import React from 'react';

import { useStepsFormDispatch } from '../context/StepsFormProvider';
import { useCustomStepInput } from './CustomStep';
import { useStepFormDispatch } from '../context/StepFormProvider';

const useStepButton = (variant, stepData) => {
    const { handlePrevStep, handleNext } = useStepsFormDispatch();
    const { rules, name, step, setError } = useCustomStepInput();
    const { setDisabledStep } = useStepFormDispatch();

    const handleClick = (e) => {
        if (rules?.hasOwnProperty('validate')) {
            const validateRes = rules.validate(stepData);
            setError(validateRes);

            if (!(typeof validateRes === 'boolean' && validateRes)) {
                setDisabledStep([step]);
                return null;
            }
            setDisabledStep([]);
        }

        variant === 'back'
            ? handlePrevStep({ [name]: stepData })
            : handleNext({ [name]: stepData });
    };

    if (!variant || (variant !== 'back' && variant !== 'next')) {
        console.error('Please provide first parametar, options are: back or next');
        return null;
    }

    if (!stepData) {
        console.error('Please provide second paremeter: step data');
        return null;
    }

    return { id: `step-form-validate-${variant}-btn`, onClick: handleClick };
};

export default useStepButton;
