import React from 'react';
import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { useStepsFormDispatch, useStepsFormState } from '../context/StepsFormProvider';

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

const Steps = ({ stepLabelProps, clickableStep, stepButtonProps, saveOnBackBtn }) => {
    const { setActiveStep } = useStepsFormDispatch();
    const { steps, activeStep, fields } = useStepsFormState();

    const handleStep = (step) => () => {
        if (!clickableStep) return null;
        const disabled = handleCheckDisable(step, steps, fields, activeStep);

        if (disabled) return null;

        let nextBtn = document.querySelectorAll('#step-form-next-btn');
        let backBtn = document.querySelectorAll('#steps-form-back-btn');

        nextBtn.length > 1 ? (nextBtn = nextBtn[activeStep]) : (nextBtn = nextBtn?.[0]);
        backBtn.length > 1 ? (backBtn = backBtn[activeStep]) : (backBtn = backBtn?.[0]);

        if (step > activeStep) {
            if (nextBtn) {
                nextBtn.click();
                nextBtn?.type === 'submit' ? setActiveStep(step - 1) : setActiveStep(step);
            }
        } else {
            if (backBtn && saveOnBackBtn) backBtn.click();
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
