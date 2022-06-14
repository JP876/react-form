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
        name: 'name1',
        label: 'Name',
        type: 'text',
    },
    {
        step: 'First step',
        name: 'slider1',
        Comp: CustomFieldSlider,
    },
    {
        step: 'Second step',
        name: 'name2',
        label: 'Name',
        type: 'text',
    },
    {
        step: 'Second step',
        name: 'checkbox',
        label: 'Checkbox',
        input: 'checkbox',
    },
    {
        step: 'Second step',
        name: 'name3',
        label: 'Name3',
        rules: {
            required: 'This field is required',
        },
    },
    {
        step: 'Second step',
        name: 'date',
        label: 'Date',
        input: 'date',
    },
    {
        step: 'Third step',
        Comp: AddFile,
    },
    {
        step: 'Final step',
        Comp: FinalStep,
    },
];
