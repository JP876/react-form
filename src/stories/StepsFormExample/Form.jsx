import { Paper } from '@mui/material';
import React from 'react';
import { StepsForm } from '../../index';
import { stepsRules } from './stepsRules';

const StepsFormExample = () => {
    const handleSubmit = (data) => {
        console.log(data);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Paper sx={{ width: '36rem', marginBottom: '3rem' }}>
                <StepsForm
                    inputs={stepsRules}
                    onSubmit={handleSubmit}
                    stepOptions={{
                        clickableStep: true,
                    }}
                    //btnMsgs={{ nextStep: 'Next', prevStep: 'Back', exit: 'Close' }}
                    //exitBtnFunc={() => console.log('yoo')}
                />
            </Paper>
        </div>
    );
};

export default StepsFormExample;
