import React, { useCallback } from 'react';
import { Button, Step, StepLabel, Stepper } from '@mui/material';

import { useStepsFormState } from '../context/StepsFormProvider.jsx';
import useHandleCheckDisable from './useHandleCheckDisable.jsx';
import { useStepperState } from '../context/StepFormProvider.jsx';

const isVisible = (el) => {
    if (!el) return null;
    const style = window.getComputedStyle(el);
    if (!style) return null;

    return (
        style.width !== '0' &&
        style.height !== '0' &&
        style.opacity !== '0' &&
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        el?.clientHeight !== 0 &&
        el?.clientWidth !== 0
    );
};

const Steps = ({ stepLabelProps, clickableStep, stepButtonProps, filteredInputs }) => {
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

        const backBtns = document.querySelectorAll('#step-form-validate-back-btn');
        const backBtn = [...backBtns].find((el) => isVisible(el));

        if (!backBtn) {
            const event = new CustomEvent('handle-step-change', { detail: { step, data: {} } });
            document.dispatchEvent(event);
        } else {
            backBtn.click();
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
