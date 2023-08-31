import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { Form } from '../../index';
import SubmitButtons from './SubmitButtons';

const inputFields = [
    {
        name: 'email',
        label: 'E-mail',
        rules: {
            required: 'This field is required',
        },
    },
    {
        name: 'date',
        label: 'Date',
        input: 'date',
        rules: {
            required: 'This field is required',
        },
    },
    {
        name: 'checkbox',
        label: 'Checkbox',
        input: 'checkbox',
        rules: {
            required: 'This field is required',
        },
    },
];

const FormWithDynamicValidation = () => {
    const [formData, setFormData] = useState({});

    useEffect(() => console.log(formData), [formData]);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper sx={{ width: '30rem' }}>
                <Form inputs={inputFields}>
                    <SubmitButtons setFormData={setFormData} />
                </Form>
            </Paper>
        </div>
    );
};

export default FormWithDynamicValidation;
