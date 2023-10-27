import React, { useCallback, useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import { Box } from '@mui/system';

import addDefaultValues from '../helpers/addDefaultValues';
import Steps from './Steps.jsx';
import StepForm from './StepForm.jsx';

export const StepsForm = ({
    inputs,
    onSubmit,
    btnMsgs = { nextStep: 'Next', prevStep: 'Back', exit: 'Close' },
    exitBtnFunc,
    stepOptions = {
        clickableStep: false,
        stepButtonProps: {},
        stepLabelProps: {},
    },
    saveOnBackBtn = false,
}) => {
    const { clickableStep, stepButtonProps, stepLabelProps } = stepOptions;

    const [activeStep, setActiveStep] = useState(0);
    const [fields, setFields] = useState([]);
    const [steps, setSteps] = useState([]);
    const [filteredInputs, setFilteredInputs] = useState([]);
    const [finalData, setFinalData] = useState(
        inputs.reduce((o, key) => ({ ...o, [key.name]: '' }), {})
    );

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

    const renderCustomComponent = useCallback((input) => {
        const { Comp } = input;
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
    }, []);

    // handle steps and inputs for step form
    useEffect(() => {
        const stepsSet = new Set();
        fields.forEach((el) => stepsSet.add(el.step));
        setSteps([...stepsSet]);
        setFilteredInputs(
            [...stepsSet].map((step) => fields.filter((input) => input.step === step))
        );
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

    if (!inputs && !onSubmit && filteredInputs.length === 0) {
        return null;
    }

    return (
        <Box className="stepForm-container">
            <Steps
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                fields={fields}
                stepLabelProps={stepLabelProps}
                clickableStep={clickableStep}
                stepButtonProps={stepButtonProps}
            />

            <Divider />

            {filteredInputs.map((input, index) => {
                let currentStep = input?.[0]?.step === steps[activeStep];

                if (
                    Array.isArray(input) &&
                    input.length === 1 &&
                    !input?.[0]?.renderForm &&
                    input?.[0]?.Comp
                ) {
                    return (
                        <Box
                            key={input[0]?.step || `steps-form_step-${index}`}
                            sx={{ display: currentStep ? 'block' : 'none' }}
                        >
                            {renderCustomComponent(input[0])}
                        </Box>
                    );
                }

                if ((Array.isArray(input) && input.length !== 0) || input?.[0]?.renderForm) {
                    return (
                        <Box
                            key={input[0]?.step || `steps-form_step-${index}`}
                            sx={{ display: currentStep ? 'block' : 'none' }}
                        >
                            <StepForm
                                index={index}
                                input={input}
                                steps={steps}
                                activeStep={activeStep}
                                handleNext={handleNext}
                                btnMsgs={btnMsgs}
                                setFinalData={setFinalData}
                                setActiveStep={setActiveStep}
                                exitBtnFunc={exitBtnFunc}
                                saveOnBackBtn={saveOnBackBtn}
                            />
                        </Box>
                    );
                }

                return null;
            })}
        </Box>
    );
};
