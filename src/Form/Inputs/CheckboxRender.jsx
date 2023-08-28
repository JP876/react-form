import React from 'react';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';

const CheckboxRender = ({ onChange, value, label, helperText }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            onChange={(e) => {
                                onChange(e.target.checked);
                            }}
                            checked={typeof value === 'boolean' && value}
                        />
                    }
                    label={label}
                />
                <FormHelperText>{helperText}</FormHelperText>
            </div>
        </div>
    );
};

export default CheckboxRender;
