import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { useStepFormDispatch } from '../context/StepFormProvider';
import { useStepsFormState } from '../context/StepsFormProvider';

const UpdateClickableStep = ({ currentStep }) => {
    const {
        watch,
        trigger,
        formState: { isSubmitted },
        getValues,
    } = useFormContext();

    const { setDisabledStep } = useStepFormDispatch();
    const { activeStep } = useStepsFormState();

    useEffect(() => {
        const subscription = watch((value) => {
            if (isSubmitted) {
                trigger(Object.keys(value)).then((res) => {
                    setDisabledStep((prevState) => {
                        let arr = [...prevState];
                        if (!res) arr = [...arr, currentStep];
                        else arr = arr.filter((step) => step !== currentStep);
                        return [...new Set(arr)];
                    });
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, trigger, setDisabledStep, currentStep, isSubmitted]);

    useEffect(() => {
        if (activeStep !== null && currentStep) {
            const event = new CustomEvent('get-form-data', { detail: { data: getValues() } });
            document.dispatchEvent(event);
        }
    }, [activeStep, getValues, currentStep]);

    return null;
};

export default UpdateClickableStep;
