import { Paper } from '@mui/material';
import React from 'react';
import { Form } from '../index';

const registerRules = [
    {
        name: 'email',
        label: 'E-mail',
    },
    {
        name: 'date',
        label: 'Date',
        input: 'date',
    },
    {
        name: 'checkbox',
        label: 'Checkbox',
        input: 'checkbox',
    },
    {
        name: 'gender',
        label: 'Gender',
        input: 'select',
        data: {
            data: [
                { pk: 'm', naziv: 'Male' },
                { pk: 'f', naziv: 'Female' },
            ],
            value: 'pk',
            label: 'naziv',
        },
    },
];

const SimpleForm = () => {
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
                <Form inputs={registerRules} onSubmit={handleSubmit} btnMessage='Login' />
            </Paper>
        </div>
    );
};

export default SimpleForm;
