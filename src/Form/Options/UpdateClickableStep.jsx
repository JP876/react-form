import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { useStepsFormDispatch } from '../context/StepsFormProvider';

const UpdateClickableStep = ({ currentStep }) => {
    const {
        watch,
        trigger,
        formState: { isSubmitted },
        getValues,
    } = useFormContext();
    const { setDisabledStep, setValues } = useStepsFormDispatch();

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
        if (currentStep) setValues(getValues());
    }, [getValues, setValues, currentStep]);

    return null;
};

export default UpdateClickableStep;
