import React from 'react';
import { TextField } from '@mui/material';

import InputMessage from '../InputMessage.jsx';

const TextRender = (props) => {
    const { onChange, type, value, name, errors, label, helperText, multiline, rows, inputProps } =
        props;

    const handleOnChange = (e) => {
        onChange(e.target.value);
        typeof inputProps?.onChange === 'function' && inputProps.onChange(e);
    };

    return (
        <TextField
            id="updateForm_textfield"
            multiline={multiline}
            rows={rows}
            fullWidth
            variant="outlined"
            type={type}
            label={label}
            {...inputProps}
            helperText={
                <InputMessage
                    errors={errors}
                    name={name}
                    helperText={helperText || inputProps?.helperText}
                />
            }
            error={errors && Boolean(errors[name])}
            value={value === 0 || value !== null ? value : ''}
            onChange={handleOnChange}
        />
    );
};

export default TextRender;
