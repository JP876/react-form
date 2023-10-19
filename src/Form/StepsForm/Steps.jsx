import React from 'react';
import { Button, Step, StepLabel, Stepper } from '@mui/material';

const handleCheckDisable = (stepIndex, steps, inputs, activeStepIndex) => {
    const requiredStep = inputs.filter(
        (i) => i.rules && i.rules.hasOwnProperty('required') && !i.defaultValue
    );

    if (requiredStep.length === 0) return false;
    let index = steps.length;

    const requiredStepIndexes = requiredStep.map((s) =>
        steps.findIndex((label) => label === s.step)
    );

    for (let i of requiredStepIndexes) {
        if (i >= activeStepIndex) {
            index = i;
            break;
        }
    }

    return stepIndex > index;
};

const Steps = ({
    steps,
    activeStep,
    setActiveStep,
    fields,
    stepLabelProps,
    clickableStep,
    stepButtonProps,
}) => {
    const handleStep = (step) => () => {
        const disabled = handleCheckDisable(step, steps, fields, activeStep);

        if (disabled) return null;

        const submitButton = document.querySelector('#form-submit-button');
        const customStepNextButton = document.getElementById('step-form-next-btn');

        if (step > activeStep) {
            if (submitButton) {
                submitButton.click();
                setActiveStep(step - 1);
            } else {
                if (customStepNextButton) {
                    customStepNextButton.click();
                }
                setActiveStep(step);
            }
        } else {
            setActiveStep(step);
        }
    };

    return (
        <Stepper activeStep={activeStep} alternativeLabel sx={{ py: 2 }}>
            {steps?.map((label, i) => (
                <Step key={label}>
                    <StepLabel
                        sx={{
                            cursor: 'pointer',
                            '&.Mui-disabled': {
                                cursor: handleCheckDisable(i, steps, fields, activeStep)
                                    ? 'default'
                                    : 'pointer',
                            },
                        }}
                        {...stepLabelProps}
                        onClick={handleStep(i)}
                    >
                        {clickableStep ? (
                            <Button
                                size="small"
                                variant="text"
                                {...stepButtonProps}
                                disabled={handleCheckDisable(i, steps, fields, activeStep)}
                            >
                                {label}
                            </Button>
                        ) : (
                            label
                        )}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default Steps;
