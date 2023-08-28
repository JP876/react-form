import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Typography } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
//import { hr } from 'date-fns/locale';

const Date = (props) => {
    const { value, onChange, name, errors, label, helperText, inputProps } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                inputFormat="dd/MM/yyyy"
                label={label}
                value={value || null}
                onChange={(newValue) => onChange(newValue)}
                {...inputProps}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            label={label}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                            helperText={
                                (Object.keys(errors).length !== 0 && errors[name] && (
                                    <ErrorMessage
                                        errors={errors}
                                        name={name}
                                        render={({ message }) => (
                                            <Typography
                                                component="span"
                                                variant="caption"
                                                color="inherit"
                                            >
                                                {message}
                                            </Typography>
                                        )}
                                    />
                                )) ||
                                helperText
                            }
                            error={Boolean(errors && errors[name])}
                        />
                    );
                }}
            />
        </LocalizationProvider>
    );
};

export default Date;
