import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { useStepsFormDispatch, useStepsFormState } from '../context/StepsFormProvider.jsx';
import { useStepFormDispatch, useStepperState } from '../context/StepFormProvider.jsx';

const CustomStepInput = createContext();
export const useCustomStepInput = () => useContext(CustomStepInput);

const CustomStepContext = createContext();
export const useCustomStepContext = () => useContext(CustomStepContext);

const CustomStepContainer = ({ input, currentStep, children }) => {
    const [error, setError] = useState(false);

    const { setActiveStep, setFinalData } = useStepsFormDispatch();
    const { stepRef } = useStepperState();
    const { setDisabledStep } = useStepFormDispatch();

    const clearError = useCallback(() => {
        setError(false);
    }, []);

    const validateStep = useCallback(
        (stepData) => {
            const { rules, step } = input;

            if (rules?.hasOwnProperty('validate')) {
                const validateRes = rules.validate(stepData);
                const res = typeof validateRes === 'boolean' ? !validateRes : validateRes;
                setError(res);

                if (typeof validateRes !== 'boolean' && validateRes) {
                    setDisabledStep([step]);
                    return false;
                }

                setDisabledStep([]);
                return true;
            }

            return true;
        },
        [input, setDisabledStep]
    );

    const stepInputValue = useMemo(() => {
        return {
            rules: input?.rules,
            name: input?.name,
            step: input?.step,
            setError,
            validateStep,
        };
    }, [input?.rules, input?.name, input?.step, validateStep]);

    const stepContextValue = useMemo(() => {
        return { error, clearError, validateStep };
    }, [clearError, error, validateStep]);

    useEffect(() => {
        const handleChangeStep = (e) => {
            if (currentStep) {
                let { step, data } = e.detail;
                if (stepRef.current !== null) step = stepRef.current;

                setFinalData((prevState) => ({ ...prevState, ...data }));
                setActiveStep((prevStep) => {
                    switch (step) {
                        case 'previous':
                            return prevStep - 1;
                        case 'next':
                            return prevStep + 1;
                        default:
                            return step;
                    }
                });
            }
        };

        document.addEventListener('handle-step-change', handleChangeStep);
        return () => {
            document.removeEventListener('handle-step-change', handleChangeStep);
        };
    }, [currentStep, setActiveStep, setFinalData, stepRef]);

    return (
        <CustomStepInput.Provider value={stepInputValue}>
            <CustomStepContext.Provider value={stepContextValue}>
                {children}
            </CustomStepContext.Provider>
        </CustomStepInput.Provider>
    );
};

const CustomStep = ({ input, currentStep }) => {
    const { Comp } = input;

    const { handleNext, handlePrevStep, handleSubmit } = useStepsFormDispatch();
    const { finalData } = useStepsFormState();

    if (!Comp) return null;

    return (
        <CustomStepContainer input={input} currentStep={currentStep}>
            <Comp
                {...(input?.compProps || {})}
                options={{
                    finalData,
                    handleSubmit,
                    handlePrevStep,
                    handleNext,
                }}
            />
        </CustomStepContainer>
    );
};

export default CustomStep;
