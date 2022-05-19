import AddFile from './AddFile';
import FinalStep from './FinalStep';

export const stepsRules = [
    {
        step: 'First step',
        name: 'name',
        label: 'Name',
        type: 'text',
    },
    {
        step: 'First step',
        name: 'date',
        label: 'Date',
        input: 'date',
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
        step: 'Final step',
        Comp: FinalStep,
    },
];
