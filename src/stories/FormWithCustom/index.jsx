import React from 'react';
import { Divider, Paper, Typography } from '@mui/material';
import { Form } from '../../index';
import { SliderField } from './SliderField';
import MultiSelect from './MultiSelect';
import RadioButtonField from './RadioButtonField';
import FileInput from './FileInput';

const namesArr = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const registerRules = [
    {
        name: 'slider',
        Comp: SliderField,
    },
    {
        name: 'email',
        label: 'E-mail',
    },
    {
        name: 'multi',
        Comp: MultiSelect,
        compProps: { names: namesArr },
    },
    {
        name: 'radio',
        Comp: RadioButtonField,
        rules: {
            required: 'This field is required',
        },
    },
    {
        name: 'files',
        Comp: FileInput,
    },
];

const data = { radio: 'm', slider: 50 };

const FormWithCustomInputs = () => {
    const handleSubmit = (data) => {
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
                <Form
                    updateData={data}
                    inputs={registerRules}
                    onSubmit={handleSubmit}
                    btnMessage="Login"
                />
            </Paper>
        </div>
    );
};

export default FormWithCustomInputs;
