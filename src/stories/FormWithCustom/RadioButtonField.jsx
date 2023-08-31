import React from 'react';
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';

const RadioButtonField = ({ onChange, value, errors }) => {
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

export default RadioButtonField;
