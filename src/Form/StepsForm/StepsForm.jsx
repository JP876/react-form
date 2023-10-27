import React from 'react';
import { Divider } from '@mui/material';
import { Box } from '@mui/system';

import Steps from './Steps.jsx';
import StepForm from './StepForm.jsx';
import StepsFormProvider, { useStepsFormState } from '../context/StepsFormProvider';
import CustomStep from './CustomStep.jsx';

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
}) => {
    const { clickableStep, stepButtonProps, stepLabelProps } = stepOptions;
    const { filteredInputs, steps, activeStep } = useStepsFormState();

    if (!inputs && !onSubmit && filteredInputs.length === 0) {
        return null;
    }

    return (
        <Box className="stepForm-container">
            <Steps
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
                            <CustomStep input={input[0]} />
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
                                input={input}
                                btnMsgs={btnMsgs}
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

export const StepsForm = (props) => {
    return (
        <StepsFormProvider {...props}>
            <StepsFormContainer {...props} />
        </StepsFormProvider>
    );
};
