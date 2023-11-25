import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

import addDefaultValues from '../helpers/addDefaultValues';

const StepsFormState = createContext();
export const useStepsFormState = () => useContext(StepsFormState);

const StepsFormDispatch = createContext();
export const useStepsFormDispatch = () => useContext(StepsFormDispatch);

const StepsFormProvider = ({ inputs, onSubmit, children }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [fields, setFields] = useState([]);
    const [steps, setSteps] = useState([]);
    const [finalData, setFinalData] = useState(
        inputs.reduce((o, key) => ({ ...o, [key.name]: '' }), {})
    );

    const justMounted = useRef(true);

    const handleSubmit = () => onSubmit(finalData);

    const handleNext = (data) => {
        if (activeStep === steps.length - 1) {
            setFinalData((prev) => ({ ...prev, ...data }));
            setTimeout(() => onSubmit({ ...finalData, ...data }), 0);
        } else {
            if (data && data?._reactName !== 'onClick') {
                setFinalData((prev) => ({ ...prev, ...data }));
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handlePrevStep = (data) => {
        if (data && data?._reactName !== 'onClick') {
            setFinalData((prev) => ({ ...prev, ...data }));
        }

        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        if (fields.length !== 0) {
            if (justMounted.current) {
                const stepsSet = new Set();
                fields.forEach((el) => stepsSet.add(el.step));
                setSteps([...stepsSet]);
            }
            justMounted.current = false;
        }
    }, [fields]);

    // handle updating default values
    useEffect(() => {
        if (inputs) {
            const inputsWithDefault = inputs.map((i) => {
                if (!i.name) return i;
                return { ...i, defaultValue: i.name };
            });
            setFields(addDefaultValues(inputsWithDefault, finalData));
        }
    }, [inputs, finalData]);

    return (
        <StepsFormDispatch.Provider
            value={{ handleNext, handlePrevStep, handleSubmit, setActiveStep, setFinalData }}
        >
            <StepsFormState.Provider value={{ steps, activeStep, finalData, fields }}>
                {children}
            </StepsFormState.Provider>
        </StepsFormDispatch.Provider>
    );
};

export default StepsFormProvider;
