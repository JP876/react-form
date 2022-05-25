import React from 'react';
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
    Select,
    InputLabel,
    MenuItem,
} from '@mui/material';
import { Form } from '../Form/Form';
import OutlinedInput from '@mui/material/OutlinedInput';

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

const MultiSelectField = ({ value, onChange, names }) => {
    return (
        <FormControl>
            <InputLabel id="demo-multiple-name-label">Name</InputLabel>
            <Select
                fullWidth
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={value || []}
                onChange={onChange}
                input={<OutlinedInput label="Name" />}
            >
                {names.map((name) => (
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

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
        name: 'multi',
        Comp: MultiSelectField,
        compProps: { names: namesArr },
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
