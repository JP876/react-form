import { ErrorMessage } from '@hookform/error-message';
import { TextField, Typography } from '@mui/material';
import React from 'react';

const TextRender = props => {
    const { onChange, type, value, name, errors, label, helperText, multiline, rows } =
        props;

    return (
        <TextField
            multiline={multiline}
            rows={rows}
            fullWidth
            onChange={onChange}
            variant='outlined'
            type={type}
            value={value === 0 || value !== null ? value : ''}
            label={label}
            helperText={
                (Object.keys(errors).length !== 0 && (
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
                )) ||
                helperText
            }
            error={errors && (errors[name] ? true : false)}
        />
    );
};

export default TextRender;
