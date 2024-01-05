import React, { useCallback } from 'react';
import { Button, Step, StepLabel, Stepper } from '@mui/material';

import { useStepsFormState } from '../context/StepsFormProvider.jsx';
import useHandleCheckDisable from './useHandleCheckDisable.jsx';
import { useStepperState } from '../context/StepFormProvider.jsx';
import isElementVisible from '../helpers/isElementVisible.js';

const Steps = ({ stepLabelProps, clickableStep, stepButtonProps }) => {
    const { steps, activeStep } = useStepsFormState();
    const { disabledStep, stepRef } = useStepperState();

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
        stepRef.current = step;

        const backBtns = document.querySelectorAll('#step-form-validate-back-btn');
        const backBtn = [...backBtns].find((el) => isElementVisible(el));

        if (!backBtn) {
            const event = new CustomEvent('handle-step-change', { detail: { step, data: {} } });
            document.dispatchEvent(event);
        } else {
            backBtn.click();
        }
        stepRef.current = null;
    };

    return (
        <Stepper activeStep={activeStep} alternativeLabel sx={{ py: 2 }}>
            {steps?.map((label, i) => {
                const check = checkDisableStep(i);
                return (
                    <Step key={label}>
                        <StepLabel
                            sx={{
                                ...(clickableStep && {
                                    cursor: 'pointer',
                                    '&.Mui-disabled': {
                                        cursor: check ? 'default' : 'pointer',
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
                                    disabled={check}
                                >
                                    {label}
                                </Button>
                            ) : (
                                label
                            )}
                        </StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
};

export default Steps;
