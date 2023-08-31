import React from 'react';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { ErrorMessage } from '@hookform/error-message';
import InputMessage from '../InputMessage';

const SelectRender = (props) => {
    const { value, onChange, name, errors, data, label, size, helperText, inputProps } =
        props;

    const handleOnChange = (e) => {
        onChange(e.target.value);
        typeof inputProps?.onChange === 'function' && inputProps.onChange(e);
    };

    return (
        <Box id="updateForm_select" sx={{ minWidth: 120 }}>
            <FormControl fullWidth error={errors && Boolean(errors[name])}>
                <InputLabel id="select-label">
                    {label || inputProps?.label || ''}
                </InputLabel>
                <Select
                    labelId="select-label"
                    id="simple-select"
                    label={label}
                    size={size || 'medium'}
                    MenuProps={{ PaperProps: { style: { maxHeight: '24rem' } } }}
                    {...inputProps}
                    value={value || ''}
                    onChange={handleOnChange}
                >
                    {data.data.map((el, i) => (
                        <MenuItem key={i} value={el[data.value]}>
                            {el[data.label]}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                    <InputMessage
                        errors={errors}
                        name={name}
                        helperText={helperText || inputProps?.helperText}
                    />
                </FormHelperText>
            </FormControl>
        </Box>
    );
};

export default SelectRender;
