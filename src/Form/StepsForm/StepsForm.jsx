import React, { useMemo } from 'react';
import { Divider } from '@mui/material';
import { Box } from '@mui/system';

import Steps from './Steps.jsx';
import StepForm from './StepForm.jsx';
import CustomStep from './CustomStep.jsx';
import StepsFormProvider, { useStepsFormState } from '../context/StepsFormProvider';

const checkCurrentStep = (input) => {
    if (Array.isArray(input) && input.length === 1 && !input?.[0]?.renderForm && input?.[0]?.Comp) {
        return 'custom-step';
    } else if ((Array.isArray(input) && input.length !== 0) || input?.[0]?.renderForm) {
        return 'form-step';
    }
    return null;
};

const SingleStepContainer = (props) => {
    const { steps, activeStep, fields } = useStepsFormState();

    const currentStep = useMemo(() => {
        return fields.filter((i) => i?.step === steps[activeStep]);
    }, [activeStep, steps, fields]);
    const step = useMemo(() => checkCurrentStep(currentStep), [currentStep]);

    if (!currentStep || step === null) return null;

    return step === 'custom-step' ? (
        <CustomStep input={currentStep[0]} />
    ) : (
        <StepForm input={currentStep} {...props} />
    );
};

const StepsFormContainer = ({
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
    mountOnlyActiveStep = true,
}) => {
    const { steps, activeStep, fields } = useStepsFormState();

    const filteredInputs = useMemo(() => {
        if (!Array.isArray(steps)) return null;
        return steps.map((step) => fields.filter((input) => input.step === step));
    }, [fields, steps]);

    if (!inputs || !onSubmit || filteredInputs.length === 0) {
        return null;
    }

    return (
        <Box className="stepForm-container">
            <Steps {...stepOptions} saveOnBackBtn={saveOnBackBtn} />

            <Divider />

            {mountOnlyActiveStep && (
                <SingleStepContainer
                    btnMsgs={btnMsgs}
                    exitBtnFunc={exitBtnFunc}
                    saveOnBackBtn={saveOnBackBtn}
                />
            )}
            {!mountOnlyActiveStep &&
                filteredInputs.map((input, index) => {
                    const currentStep = input?.[0]?.step === steps[activeStep];
                    const step = checkCurrentStep(currentStep);

                    if (currentStep && step !== null) {
                        return (
                            <Box
                                key={input[0]?.step || `steps-form_step-${index}`}
                                sx={{ display: currentStep ? 'block' : 'none' }}
                            >
                                {step === 'custom-step' ? (
                                    <CustomStep input={input[0]} />
                                ) : (
                                    <StepForm
                                        input={input}
                                        btnMsgs={btnMsgs}
                                        exitBtnFunc={exitBtnFunc}
                                        saveOnBackBtn={saveOnBackBtn}
                                    />
                                )}
                            </Box>
                        );
                    }

                    return null;
                })}
        </Box>
    );
};

export const StepsForm = (props) => {
    return (
        <StepsFormProvider {...props}>
            <StepsFormContainer {...props} />
        </StepsFormProvider>
    );
};
