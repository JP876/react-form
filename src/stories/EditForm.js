import React from 'react';
import { Paper, Button } from '@mui/material';
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

const data = {
    email: 'test@test.com',
    date: new Date(),
    checkbox: true,
    gender: 'm',
};

const EditForm = () => {
    const handleSubmit = (data, e) => {
        console.log(data);
        console.log(e);
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
                <Form
                    updateData={data}
                    inputs={registerRules}
                    updateDisable
                    onSubmit={handleSubmit}
                    btnMessage="Login"
                />
            </Paper>
        </div>
    );
};

export default EditForm;
