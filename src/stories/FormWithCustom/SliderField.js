import React from 'react';
import { Slider } from '@mui/material';

export const SliderField = ({ onChange, value }) => {
    return (
        <Slider
            step={10}
            min={0}
            max={100}
            value={typeof value === 'string' ? 0 : value}
            onChange={onChange}
            valueLabelDisplay="auto"
        />
    );
};
