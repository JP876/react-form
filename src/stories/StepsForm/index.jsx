import React from 'react';
import { Paper, Stack } from '@mui/material';

import { StepsForm } from '../../index';
import { stepsRules } from './stepsRules';

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
                    stepOptions={{
                        clickableStep: true,
                    }}
                    btnMsgs={{ nextStep: 'Next', prevStep: 'Back', exit: 'Close' }}
                    //exitBtnFunc={() => console.log('yoo')}
                />
            </Paper>
        </Stack>
    );
};

export default StepsFormExample;
