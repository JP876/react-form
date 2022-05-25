import React from 'react';
import { Button } from '@mui/material';

const BackStepBtn = ({
    options: { getValues },
    setFinalData,
    setActiveStep,
    activeStep,
    btnMsg,
}) => {
    const handleValues = () => {
        setFinalData((prev) => ({ ...prev, ...getValues() }));
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Button
            disabled={activeStep === 0}
            onClick={handleValues}
            color="error"
            variant="outlined"
        >
            {btnMsg}
        </Button>
    );
};

export default BackStepBtn;
