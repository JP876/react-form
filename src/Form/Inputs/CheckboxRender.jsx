import React from 'react';
import { Checkbox, FormControlLabel, FormHelperText, Stack } from '@mui/material';
import { Box } from '@mui/system';

const CheckboxRender = ({
    field,
    fieldState,
    formState,
    label,
    helperText,
    inputProps,
    methods,
}) => {
    return (
        <Stack id="updateForm_checkbox" direction="row" justifyContent="center" mt={0.4}>
            <Box>
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            {...inputProps}
                            onBlur={field?.onBlur}
                            inputRef={field?.ref}
                            onChange={(e) => {
                                field?.onChange(e.target.checked);
                                typeof inputProps?.onChange === 'function' &&
                                    inputProps.onChange(e, methods, fieldState, formState);
                            }}
                            checked={typeof field?.value === 'boolean' && field?.value}
                        />
                    }
                    label={label || inputProps?.label || ''}
                />
                <FormHelperText>{helperText}</FormHelperText>
            </Box>
        </Stack>
    );
};

export default CheckboxRender;
