import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useStepsFormDispatch, useStepsFormState } from '../context/StepsFormProvider.jsx';

const CustomStepInput = createContext();
export const useCustomStepInput = () => useContext(CustomStepInput);

const CustomStep = ({ input, currentStep }) => {
    const { Comp } = input;
    const [error, setError] = useState(null);

    const { handleNext, handlePrevStep, handleSubmit, setActiveStep, setFinalData } =
        useStepsFormDispatch();
    const { finalData, activeStep } = useStepsFormState();

    const stepInputValue = useMemo(() => {
        return { rules: input?.rules, name: input?.name, step: input?.step, setError };
    }, [input?.rules, input?.name, input?.step]);

    useEffect(() => {
        const handleChangeStep = (e) => {
            if (currentStep) {
                const { step, data } = e.detail;

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
    }, [currentStep, setActiveStep, setFinalData]);

    if (!Comp) return null;

    return (
        <CustomStepInput.Provider value={stepInputValue}>
            <Comp
                options={{
                    finalData,
                    handleSubmit,
                    handlePrevStep,
                    handleNext,
                    currentStep,
                    activeStep,
                    error,
                }}
            />
        </CustomStepInput.Provider>
    );
};

export default CustomStep;
