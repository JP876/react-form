import React from 'react';
import { Button } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const BackStepBtn = ({ setFinalData, setActiveStep, activeStep, saveOnBackBtn, children }) => {
    const { watch } = useFormContext();

    const handleValues = () => {
        if (saveOnBackBtn) {
            setFinalData((prev) => ({ ...prev, ...watch() }));
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Button
            id="steps-form-back-btn"
            disabled={activeStep === 0}
            onClick={handleValues}
            color="error"
            variant="outlined"
        >
            {children}
        </Button>
    );
};

export default BackStepBtn;
