import { Paper } from '@mui/material';
import React from 'react';
import StepsForm from '../../Form/StepsForm';

const stepsRules = [
    {
        step: 'First step',
        name: 'name',
        label: 'Name',
        type: 'text',
        defaultValue: 'name',
    },
    {
        step: 'First step',
        name: 'date',
        label: 'Date',
        input: 'date',
        defaultValue: 'date',
    },
    {
        step: 'Second step',
        name: 'checkbox',
        label: 'Checkbox',
        input: 'checkbox',
        defaultValue: 'checkbox',
    },
];

const StepsFormExample = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper sx={{ width: '30rem' }}>
                <StepsForm inputs={stepsRules} />
            </Paper>
        </div>
    );
};

export default StepsFormExample;
