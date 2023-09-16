import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

import { useFormConfigState } from '../context/FormConfigProvider.jsx';
import InputMessage from '../InputMessage.jsx';

const Date = ({ field, fieldState, formState, errors, label, helperText, inputProps, methods }) => {
    const config = useFormConfigState();

    const handleOnChange = (newValue) => {
        field?.onChange(newValue);
        typeof inputProps?.onChange === 'function' &&
            inputProps.onChange(newValue, methods, fieldState, formState);
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
                onBlur={field?.onBlur}
                inputRef={field?.ref}
                value={field?.value}
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
                                    name={field?.name}
                                    helperText={helperText || inputProps?.helperText}
                                />
                            }
                            error={errors && Boolean(errors[field?.name])}
                        />
                    );
                }}
            />
        </LocalizationProvider>
    );
};

export default Date;
