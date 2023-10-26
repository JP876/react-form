import React, { useMemo } from 'react';
import { Button } from '@mui/material';

import UpdateForm from '../UpdateForm.jsx';
import BackStepBtn from './BackStepBtn.jsx';

const StepForm = ({
    input,
    steps,
    activeStep,
    handleNext,
    btnMsgs,
    setFinalData,
    setActiveStep,
    exitBtnFunc,
    saveOnBackBtn,
}) => {
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
    }, [btnMsgs, activeStep]);

    return (
        <UpdateForm
            inputs={input}
            onSubmit={handleNext}
            btnMessage={buttonMessages.nextStep || 'Next'}
        >
            {typeof exitBtnFunc === 'function' ? (
                <Button onClick={exitBtnFunc} color="error" variant="outlined">
                    {buttonMessages.exit || 'Close'}
                </Button>
            ) : (
                <></>
            )}

            <BackStepBtn
                setFinalData={setFinalData}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                saveOnBackBtn={saveOnBackBtn}
            >
                {buttonMessages.prevStep || 'Back'}
            </BackStepBtn>
        </UpdateForm>
    );
};

export default StepForm;
