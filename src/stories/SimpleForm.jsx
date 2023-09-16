import React, { useEffect } from 'react';
import { Paper, Stack } from '@mui/material';
import { hr } from 'date-fns/locale';

import { Form, FormConfigProvider } from '../index';

const config = { date: { adapterLocale: hr } };

const registerRules = [
    {
        name: 'email',
        label: 'E-mail',
        rules: { required: 'This field is required' },
        inputProps: {
            helperText: 'Required',
        },
    },
    {
        name: 'date',
        label: 'Date',
        input: 'date',
        rules: { required: 'This field is required' },
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
        rules: { required: 'This field is required' },
        helperText: 'Required',
    },
];

const FocusOnFirstInput = ({ methods }) => {
    useEffect(() => {
        methods?.setFocus('email');
    }, [methods?.setFocus]);

    return null;
};

const SimpleForm = () => {
    const handleSubmit = (data) => {
        console.log(data);
    };

    return (
        <FormConfigProvider config={config}>
            <Stack direction="row" justifyContent="center" alignItems="center">
                <Paper sx={{ width: '30rem' }}>
                    <Form
                        inputs={registerRules}
                        onSubmit={handleSubmit}
                        btnMessage="Login"
                        getFormMethods={(methods) => <FocusOnFirstInput methods={methods} />}
                    />
                </Paper>
            </Stack>
        </FormConfigProvider>
    );
};

export default SimpleForm;
