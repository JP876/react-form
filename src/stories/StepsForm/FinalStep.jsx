import React from 'react';
import { Button, Divider, Stack, Typography } from '@mui/material';

const FinalStep = ({
    options: { finalData, handlePrevStep, handleNext, handleSubmit, currentStep, activeStep },
}) => {
    // if (!currentStep) return null;

    return (
        <>
            <Typography align="center" variant="h4" my={4}>
                This is final step
            </Typography>
            <Divider />
            <Stack direction="row" justifyContent="space-around" p={2}>
                <Button
                    id="step-form-back-btn"
                    onClick={handlePrevStep}
                    color="error"
                    variant="outlined"
                >
                    Back
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Next
                </Button>
            </Stack>
        </>
    );
};

export default FinalStep;
