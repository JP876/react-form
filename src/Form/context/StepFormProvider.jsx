import React, { createContext, useContext, useMemo, useState } from 'react';

const StepFormState = createContext();
export const useStepFormState = () => useContext(StepFormState);

const StepperState = createContext();
export const useStepperState = () => useContext(StepperState);

const StepFormDispatch = createContext();
export const useStepFormDispatch = () => useContext(StepFormDispatch);

const StepFormProvider = ({ children }) => {
    const [disabledStep, setDisabledStep] = useState([]);
    const [values, setValues] = useState({});

    const dispatchValue = useMemo(() => ({ setDisabledStep, setValues }), []);
    const stepValue = useMemo(() => ({ values }), [values]);
    const stepperValue = useMemo(() => ({ disabledStep }), [disabledStep]);

    return (
        <StepFormDispatch.Provider value={dispatchValue}>
            <StepFormState.Provider value={stepValue}>
                <StepperState.Provider value={stepperValue}>{children}</StepperState.Provider>
            </StepFormState.Provider>
        </StepFormDispatch.Provider>
    );
};

export default StepFormProvider;
