import AddFile from './AddFile';
import FinalStep from './FinalStep';

const a = [
    {
        step: 'First step',
        fields: [
            {
                name: 'name',
                label: 'Name',
            },
            {
                name: 'date',
                label: 'Date',
                input: 'date',
            },
        ],
    },
    {
        step: 'Second step',
        Comp: AddFile,
    },
    {
        step: 'Third step',
        fields: [
            {
                name: 'checkbox',
                label: 'Checkbox',
                input: 'checkbox',
            },
            {
                name: 'name1',
                label: 'Name1',
                rules: {
                    required: 'This field is required',
                },
            },
        ],
    },
    {
        step: 'Final step',
        Comp: FinalStep,
    },
];

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
