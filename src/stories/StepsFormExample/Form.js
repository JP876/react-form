import { Paper } from '@mui/material';
import React from 'react';
import StepsForm from '../../Form/StepsForm';
import { stepsRules } from './stepsRules';

const StepsFormExample = () => {
    const handleSubmit = data => {
        console.log(data);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper sx={{ width: '30rem' }}>
                <StepsForm inputs={stepsRules} onSubmit={handleSubmit} />
            </Paper>
        </div>
    );
};

export default StepsFormExample;
