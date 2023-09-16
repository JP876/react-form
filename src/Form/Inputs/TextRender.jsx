import React from 'react';
import { TextField } from '@mui/material';

import InputMessage from '../InputMessage.jsx';

const TextRender = ({
    field,
    fieldState,
    formState,
    type,
    errors,
    label,
    helperText,
    multiline,
    rows,
    inputProps,
    methods,
}) => {
    const handleOnChange = (e) => {
        field?.onChange(e.target.value);
        typeof inputProps?.onChange === 'function' &&
            inputProps.onChange(e, methods, fieldState, formState);
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
            inputRef={field?.ref}
            onBlur={field.onBlur}
            helperText={
                <InputMessage
                    errors={errors}
                    name={field?.name}
                    helperText={helperText || inputProps?.helperText}
                />
            }
            error={errors && Boolean(errors[field?.name])}
            value={field?.value === 0 || field?.value !== null ? field?.value : ''}
            onChange={handleOnChange}
        />
    );
};

export default TextRender;
