import React from 'react';
import { Button } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useStepsFormDispatch } from '../context/StepsFormProvider';

const BackStepBtn = ({ saveOnBackBtn, btnProps, children }) => {
    const { watch } = useFormContext();
    const { setFinalData, setActiveStep } = useStepsFormDispatch();

    const handleValues = () => {
        if (saveOnBackBtn) {
            setFinalData((prev) => ({ ...prev, ...watch() }));
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Button onClick={handleValues} color="error" variant="outlined" {...btnProps}>
            {children}
        </Button>
    );
};

export default BackStepBtn;