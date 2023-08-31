import React from 'react';
import { Checkbox, FormControlLabel, FormHelperText, Stack } from '@mui/material';

const CheckboxRender = ({ onChange, value, label, helperText, inputProps }) => {
    return (
        <Stack id="updateForm_checkbox" direction="row" justifyContent="center" mt={0.4}>
            <FormControlLabel
                control={
                    <Checkbox
                        color="primary"
                        {...inputProps}
                        onChange={(e) => {
                            onChange(e.target.checked);
                        }}
                        checked={typeof value === 'boolean' && value}
                    />
                }
                label={label || inputProps?.label || ''}
            />
            <FormHelperText>{helperText}</FormHelperText>
        </Stack>
    );
};

export default CheckboxRender;
