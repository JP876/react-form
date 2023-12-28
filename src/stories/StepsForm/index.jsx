import React from 'react';
import { Paper, Stack } from '@mui/material';

import { StepsForm } from '../../index';
import { stepsRules } from './stepsRules';

const stepOptions = { clickableStep: true };

const StepsFormExample = () => {
    const handleSubmit = (data) => {
        console.log(data);
    };

    return (
        <Stack justifyContent="center" alignItems="center">
            <Paper sx={{ width: '36rem', marginBottom: '3rem' }}>
                <StepsForm
                    inputs={stepsRules}
                    onSubmit={handleSubmit}
                    stepOptions={stepOptions}
                    // saveOnBackBtn
                    mountOnlyActiveStep={false}
                    // btnMsgs={{ nextStep: 'Next', prevStep: 'Back', exit: 'Close' }}
                    btnMsgs={[
                        // { step: 'Third step2', nextStep: 'Add' },
                        // Default button messages
                        { nextStep: 'Next', prevStep: 'Back', exit: 'Close' },
                    ]}
                    // exitBtnFunc={() => console.log('yoo')}
                />
            </Paper>
        </Stack>
    );
};

export default StepsFormExample;
