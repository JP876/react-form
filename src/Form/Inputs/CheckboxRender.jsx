import React from 'react';
import { Checkbox, FormControlLabel, FormHelperText, Stack } from '@mui/material';
import { Box } from '@mui/system';

const CheckboxRender = ({ onChange, value, label, helperText, inputProps }) => {
    return (
        <Stack id="updateForm_checkbox" direction="row" justifyContent="center" mt={0.4}>
            <Box>
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
            </Box>
        </Stack>
    );
};

export default CheckboxRender;
