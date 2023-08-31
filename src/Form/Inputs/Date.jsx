import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

import { useFormConfigState } from '../context/FormConfigProvider';
import InputMessage from '../InputMessage';

const Date = (props) => {
    const { value, onChange, name, errors, label, helperText, inputProps } = props;

    const config = useFormConfigState();

    const handleOnChange = (newValue) => {
        onChange(newValue);
        typeof inputProps?.onChange === 'function' && inputProps.onChange(newValue);
    };

    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={config?.date?.adapterLocale}
        >
            <DatePicker
                id="updateForm_datepicker"
                inputFormat="dd/MM/yyyy"
                label={label}
                {...inputProps}
                value={value}
                onChange={handleOnChange}
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
                                <InputMessage
                                    errors={errors}
                                    name={name}
                                    helperText={helperText || inputProps?.helperText}
                                />
                            }
                            error={errors && Boolean(errors[name])}
                        />
                    );
                }}
            />
        </LocalizationProvider>
    );
};

export default Date;
