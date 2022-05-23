import { Slider } from '@mui/material';
import AddFile from './AddFile';
import FinalStep from './FinalStep';

const CustomFieldSlider = ({ onChange, value }) => {
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

export const stepsRules = [
    {
        step: 'First step',
        name: 'name',
        label: 'Name',
        type: 'text',
    },
    {
        step: 'First step',
        name: 'slider',
        Comp: CustomFieldSlider,
    },
    {
        step: 'Second step',
        Comp: AddFile,
    },
    {
        step: 'Third step',
        name: 'checkbox',
        label: 'Checkbox',
        input: 'checkbox',
    },
    {
        step: 'Third step',
        name: 'name1',
        label: 'Name1',
        rules: {
            required: 'This field is required',
        },
    },
    {
        step: 'Third step',
        name: 'date',
        label: 'Date',
        input: 'date',
    },
    {
        step: 'Final step',
        Comp: FinalStep,
    },
];
