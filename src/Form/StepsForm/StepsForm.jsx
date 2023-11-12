import React, { useCallback, useMemo } from 'react';
import { Divider } from '@mui/material';
import { Box } from '@mui/system';

import Steps from './Steps.jsx';
import StepForm from './StepForm.jsx';
import StepsFormProvider, { useStepsFormState } from '../context/StepsFormProvider';
import CustomStep from './CustomStep.jsx';

const checkCurrentStep = (input) => {
    if (Array.isArray(input) && input.length === 1 && !input?.[0]?.renderForm && input?.[0]?.Comp) {
        return 'custom-step';
    } else if ((Array.isArray(input) && input.length !== 0) || input?.[0]?.renderForm) {
        return 'form-step';
    }
    return null;
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
        return steps.map((step) => fields.filter((input) => input.step === step));
    }, [fields, steps]);

    const renderSteps = useCallback(() => {
        const currentStep = fields.filter((i) => i?.step === steps[activeStep]);
        const step = checkCurrentStep(currentStep);

        if (currentStep && step !== null) {
            if (step === 'custom-step') {
                return <CustomStep input={currentStep[0]} />;
            } else {
                return (
                    <StepForm
                        input={currentStep}
                        btnMsgs={btnMsgs}
                        exitBtnFunc={exitBtnFunc}
                        saveOnBackBtn={saveOnBackBtn}
                    />
                );
            }
        }

        return null;
    }, [activeStep, steps, fields, btnMsgs, exitBtnFunc, saveOnBackBtn]);

    if (!inputs && !onSubmit && filteredInputs.length === 0) {
        return null;
    }

    return (
        <Box className="stepForm-container">
            <Steps {...stepOptions} saveOnBackBtn={saveOnBackBtn} />

            <Divider />

            {mountOnlyActiveStep && renderSteps()}
            {!mountOnlyActiveStep &&
                filteredInputs.map((input, index) => {
                    const currentStep = input?.[0]?.step === steps[activeStep];
                    const step = checkCurrentStep(currentStep);

                    if (currentStep && step !== null) {
                        if (step === 'custom-step') {
                            return (
                                <Box
                                    key={input[0]?.step || `steps-form_step-${index}`}
                                    sx={{ display: currentStep ? 'block' : 'none' }}
                                >
                                    <CustomStep input={input[0]} />
                                </Box>
                            );
                        } else {
                            return (
                                <Box
                                    key={input[0]?.step || `steps-form_step-${index}`}
                                    sx={{ display: currentStep ? 'block' : 'none' }}
                                >
                                    <StepForm
                                        input={input}
                                        btnMsgs={btnMsgs}
                                        exitBtnFunc={exitBtnFunc}
                                        saveOnBackBtn={saveOnBackBtn}
                                    />
                                </Box>
                            );
                        }
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
