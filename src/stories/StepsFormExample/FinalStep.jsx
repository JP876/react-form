import React from 'react';
import { Button, Divider, Typography } from '@mui/material';

const FinalStep = ({
    options: { finalData, handlePrevStep, handleNext, handleSubmit },
}) => {
    return (
        <>
            <Typography align='center' variant='h4' my={4}>
                This is final step
            </Typography>
            <Divider />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '1rem',
                }}
            >
                <Button onClick={handlePrevStep} color='error' variant='outlined'>
                    Back
                </Button>
                <Button onClick={handleSubmit} color='primary' variant='contained'>
                    Next
                </Button>
            </div>
        </>
    );
};

export default FinalStep;
