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

const SelectRender = props => {
    const { value, onChange, name, errors, data, label, size } = props;

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth error={errors && (errors[name] ? true : false)}>
                <InputLabel id='select-label'>{label}</InputLabel>
                <Select
                    labelId='select-label'
                    id='simple-select'
                    value={value || ''}
                    label={label}
                    onChange={onChange}
                    size={size || 'medium'}
                    MenuProps={{ PaperProps: { style: { maxHeight: '24rem' } } }}
                >
                    {data.data.map((el, i) => (
                        <MenuItem key={i} value={el[data.value]}>
                            {el[data.label]}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                    {errors && (
                        <ErrorMessage
                            errors={errors}
                            name={name}
                            render={({ message }) => (
                                <Typography
                                    component='span'
                                    variant='caption'
                                    color='inherit'
                                >
                                    {message}
                                </Typography>
                            )}
                        />
                    )}
                </FormHelperText>
            </FormControl>
        </Box>
    );
};

export default SelectRender;
