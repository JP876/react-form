import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';

const MultiSelect = ({ value, onChange, names }) => {
    return (
        <FormControl>
            <InputLabel id="demo-multiple-name-label">Name</InputLabel>
            <Select
                fullWidth
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={value || []}
                onChange={onChange}
                input={<OutlinedInput label="Name" />}
            >
                {names.map((name) => (
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultiSelect;
