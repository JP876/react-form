import React from 'react';
import { Button } from '@mui/material';

import UpdateForm from '../UpdateForm.jsx';
import BackStepBtn from '../BackStepBtn.jsx';

const StepForm = ({
    input,
    activeStep,
    steps,
    handleSubmit,
    handleNext,
    btnMsgs,
    setFinalData,
    setActiveStep,
    exitBtnFunc,
}) => {
    return (
        <UpdateForm
            inputs={input}
            onSubmit={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            btnMessage={btnMsgs.nextStep}
        >
            {typeof exitBtnFunc === 'function' ? (
                <Button onClick={exitBtnFunc} color="error" variant="outlined">
                    {btnMsgs.exit}
                </Button>
            ) : (
                <></>
            )}

            <BackStepBtn
                setFinalData={setFinalData}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                btnMsg={btnMsgs.prevStep}
            />
        </UpdateForm>
    );
};

export default StepForm;
