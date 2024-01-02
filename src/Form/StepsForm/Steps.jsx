import React, { useCallback } from 'react';
import { Button, Step, StepLabel, Stepper } from '@mui/material';

import { useStepsFormDispatch, useStepsFormState } from '../context/StepsFormProvider.jsx';
import useHandleCheckDisable from './useHandleCheckDisable.jsx';
import { useStepperState } from '../context/StepFormProvider.jsx';

const Steps = ({ stepLabelProps, clickableStep, stepButtonProps }) => {
    const { setActiveStep } = useStepsFormDispatch();
    const { steps, activeStep } = useStepsFormState();
    const { disabledStep } = useStepperState();

    const handleCheckDisable = useHandleCheckDisable();

    const checkDisableStep = useCallback(
        (i) => {
            const check = handleCheckDisable(i);

            if (disabledStep.length !== 0) {
                const index = disabledStep.reduce((prevValue, step) => {
                    const firstStepIndex = steps.findIndex((s) => s === step);
                    if (firstStepIndex < prevValue || prevValue === null) {
                        return firstStepIndex;
                    }
                    return prevValue;
                }, null);

                return index <= i - 1 || check;
            }

            return check;
        },
        [disabledStep, steps, handleCheckDisable]
    );

    const handleStep = (step) => () => {
        if (!clickableStep) return null;
        const disabled = checkDisableStep(step);

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
                                    cursor: checkDisableStep(i) ? 'default' : 'pointer',
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
                                disabled={checkDisableStep(i)}
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
