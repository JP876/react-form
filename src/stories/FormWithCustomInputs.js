import {
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Paper,
    Radio,
    RadioGroup,
    Slider,
    Typography,
} from '@mui/material';
import React from 'react';
import { Form } from '../Form/Form';

const CustomFieldSlider = ({ onChange, value }) => {
    return (
        <Slider
            step={10}
            min={0}
            max={100}
            value={typeof value === 'string' ? 0 : value}
            onChange={onChange}
            valueLabelDisplay="auto"
        />
    );
};

const CustomFieldRadioBtn = ({ onChange, value, errors }) => {
    return (
        <FormControl error={!!errors?.radio} sx={{ margin: '0 auto' }}>
            <FormLabel sx={{ margin: '0 auto' }}>Gender</FormLabel>
            <RadioGroup row value={value} onChange={onChange}>
                <FormControlLabel value="f" control={<Radio />} label="Female" />
                <FormControlLabel value="m" control={<Radio />} label="Male" />
            </RadioGroup>
            <FormHelperText>{errors?.radio?.message}</FormHelperText>
        </FormControl>
    );
};

const Text = () => {
    return (
        <>
            <Divider />
            <Typography variant="h5" align="center" my={1}>
                This is text
            </Typography>
            <Divider />
        </>
    );
};

const registerRules = [
    {
        name: 'email',
        label: 'E-mail',
    },
    {
        name: 'slider',
        Comp: CustomFieldSlider,
    },
    {
        Comp: Text,
    },
    {
        name: 'checkbox1',
        label: 'Checkbox',
        input: 'checkbox',
    },
    {
        name: 'checkbox2',
        label: 'Checkbox',
        input: 'checkbox',
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
    },
    {
        name: 'radio',
        Comp: CustomFieldRadioBtn,
        rules: {
            required: 'This field is required',
        },
    },
];

const data = { radio: 'm', slider: 50 };

const FormWithCustomInputs = () => {
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
                <Form
                    //updateData={data}
                    inputs={registerRules}
                    onSubmit={handleSubmit}
                    btnMessage="Login"
                />
            </Paper>
        </div>
    );
};

export default FormWithCustomInputs;
