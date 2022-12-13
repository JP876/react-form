import React from 'react';
import { Paper, Stack } from '@mui/material';
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
        name: 'checkbox1',
        label: 'Checkbox1',
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
    const handleSubmit = (data) => {
        console.log(data);
    };

    return (
        <Stack direction="row" justifyContent="center" alignItems="center">
            <Paper sx={{ width: '30rem' }}>
                <Form inputs={registerRules} onSubmit={handleSubmit} btnMessage="Login" />
            </Paper>
        </Stack>
    );
};

export default SimpleForm;
