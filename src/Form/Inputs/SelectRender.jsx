import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';

import InputMessage from '../InputMessage.jsx';

const SelectRender = ({
    field,
    fieldState,
    formState,
    errors,
    data,
    label,
    size,
    helperText,
    inputProps,
    methods,
}) => {
    const handleOnChange = (e) => {
        field?.onChange(e.target.value);
        typeof inputProps?.onChange === 'function' &&
            inputProps.onChange(e, methods, fieldState, formState);
    };

    return (
        <Box id="updateForm_select" sx={{ minWidth: 120 }}>
            <FormControl fullWidth error={errors && Boolean(errors[field?.name])}>
                <InputLabel id="select-label">{label || inputProps?.label || ''}</InputLabel>
                <Select
                    labelId="select-label"
                    id="simple-select"
                    label={label || inputProps?.label || ''}
                    size={size || 'medium'}
                    MenuProps={{ PaperProps: { style: { maxHeight: '24rem' } } }}
                    {...inputProps}
                    onBlur={field?.onBlur}
                    inputRef={field?.ref}
                    value={field?.value || ''}
                    onChange={handleOnChange}
                >
                    <MenuItem value="" sx={{ display: 'none' }} />
                    {data.data.map((el, i) => (
                        <MenuItem key={i} value={el[data.value]}>
                            {el[data.label]}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                    <InputMessage
                        errors={errors}
                        name={field?.name}
                        helperText={helperText || inputProps?.helperText}
                    />
                </FormHelperText>
            </FormControl>
        </Box>
    );
};

export default SelectRender;
