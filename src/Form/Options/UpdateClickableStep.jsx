import React, { useCallback, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { useStepFormDispatch } from '../context/StepFormProvider.jsx';
import { useStepsFormDispatch, useStepsFormState } from '../context/StepsFormProvider.jsx';

const UpdateClickableStep = ({ currentStep }) => {
    const {
        watch,
        trigger,
        formState: { isSubmitted, errors },
        getValues,
    } = useFormContext();

    const submitCountRef = useRef(0);

    const { setDisabledStep } = useStepFormDispatch();
    const { activeStep } = useStepsFormState();
    const { setFinalData, setActiveStep } = useStepsFormDispatch();

    const handleTrigger = useCallback(
        async (value) => {
            const result = await trigger(Object.keys(value));
            setDisabledStep((prevState) => {
                let arr = [...prevState];
                if (!result) arr = [...arr, currentStep];
                else arr = arr.filter((step) => step !== currentStep);
                return [...new Set(arr)];
            });
            return result;
        },
        [currentStep, setDisabledStep, trigger]
    );

    useEffect(() => {
        const subscription = watch((value) => {
            if (isSubmitted || submitCountRef.current > 0) {
                handleTrigger(value);
                const event = new CustomEvent('get-single-step-form-data', {
                    detail: { data: value },
                });
                document.dispatchEvent(event);
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, isSubmitted, handleTrigger]);

    useEffect(() => {
        if (activeStep !== null && currentStep) {
            const event = new CustomEvent('get-single-step-form-data', {
                detail: { data: getValues() },
            });
            document.dispatchEvent(event);
        }
    }, [activeStep, getValues, currentStep]);

    useEffect(() => {
        const handleStepChange = async (e) => {
            const { step } = e.detail;

            if (activeStep !== null && currentStep) {
                submitCountRef.current = 1;

                const data = { ...getValues(), ...e.detail?.data };
                const result = await handleTrigger(data);

                if (result) {
                    setFinalData((prevState) => ({ ...prevState, ...data }));
                    setActiveStep((prevStep) => {
                        switch (step) {
                            case 'previous':
                                return prevStep - 1;
                            default:
                                return step;
                        }
                    });
                }
            }
        };

        document.addEventListener('handle-step-change', handleStepChange);

        return () => {
            document.removeEventListener('handle-step-change', handleStepChange);
        };
    }, [activeStep, currentStep, getValues, handleTrigger, setActiveStep, setFinalData]);

    useEffect(() => {
        if (Object.keys(errors).length !== 0 && currentStep) {
            submitCountRef.current = 1;
            setDisabledStep([currentStep]);
        }
    }, [errors, currentStep, setDisabledStep]);

    return null;
};

export default UpdateClickableStep;
