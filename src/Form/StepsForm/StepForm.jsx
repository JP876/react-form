import React, { useMemo } from 'react';
import { Button } from '@mui/material';

import UpdateForm from '../UpdateForm.jsx';
import BackStepBtn from './BackStepBtn.jsx';
import { useStepsFormDispatch, useStepsFormState } from '../context/StepsFormProvider.jsx';

const StepForm = ({ input, btnMsgs, exitBtnFunc, saveOnBackBtn, clickableStep, currentStep }) => {
    const { handleNext } = useStepsFormDispatch();
    const { steps, activeStep } = useStepsFormState();

    const buttonMessages = useMemo(() => {
        if (Array.isArray(btnMsgs)) {
            const defaultBtnMsgs = btnMsgs.find((el) => !el?.step);
            const activeStepBtnMsgs = btnMsgs.find((el) => el?.step === steps[activeStep]);

            if (defaultBtnMsgs?.nextStep && defaultBtnMsgs?.prevStep && defaultBtnMsgs?.exit) {
                return activeStepBtnMsgs
                    ? { ...defaultBtnMsgs, ...activeStepBtnMsgs }
                    : defaultBtnMsgs;
            }

            return null;
        }

        return btnMsgs;
    }, [btnMsgs, activeStep, steps]);

    return (
        <UpdateForm
            inputs={input}
            onSubmit={handleNext}
            clickableStep={clickableStep}
            currentStep={currentStep}
        >
            {typeof exitBtnFunc === 'function' ? (
                <Button onClick={exitBtnFunc} color="error" variant="outlined">
                    {buttonMessages?.exit || 'Close'}
                </Button>
            ) : (
                <></>
            )}

            <BackStepBtn
                saveOnBackBtn={saveOnBackBtn}
                btnProps={{
                    id: 'steps-form-back-btn',
                    disabled: activeStep === 0,
                }}
            >
                {buttonMessages?.prevStep || 'Back'}
            </BackStepBtn>

            <Button id="step-form-next-btn" type="submit" variant="contained" color="primary">
                {buttonMessages?.nextStep || 'Next'}
            </Button>
        </UpdateForm>
    );
};

export default StepForm;
