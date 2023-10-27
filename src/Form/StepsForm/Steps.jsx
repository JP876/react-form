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
        if (!clickableStep) return null;
        const disabled = handleCheckDisable(step, steps, fields, activeStep);

        if (disabled) return null;

        const nextBtn = document.querySelectorAll('#step-form-next-btn')?.[activeStep];
        const backBtn = document.querySelectorAll('#steps-form-back-btn')?.[activeStep];

        if (step > activeStep) {
            if (nextBtn) {
                nextBtn.click();
                nextBtn?.type === 'submit' ? setActiveStep(step - 1) : setActiveStep(step);
            }
        } else {
            if (backBtn) backBtn.click();
            setActiveStep(step);
        }
    };

    return (
        <Stepper activeStep={activeStep} alternativeLabel sx={{ py: 2 }}>
            {steps?.map((label, i) => (
                <Step key={label}>
                    <StepLabel
                        sx={{
                            ...(clickableStep && {
                                cursor: 'pointer',
                                '&.Mui-disabled': {
                                    cursor: handleCheckDisable(i, steps, fields, activeStep)
                                        ? 'default'
                                        : 'pointer',
                                },
                            }),
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
