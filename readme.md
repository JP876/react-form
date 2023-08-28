# @josipp/react-form

> React from that uses react-hook-form with Material UI components. At the moment, supported fields are: text, date, select and checkbox.

## Install

```bash
npm i @josipp/react-form
```

## Basic Usage

```jsx
import React from 'react';
import { Paper } from '@mui/material';
import { Form } from '@josipp/react-form';

// default input type is text, other types are: date, select and checkbox
// for select input type, data is required
// you can pass helperText to types: text, checkbox and date
const inputRules = [
    {
        name: 'email',
        label: 'E-mail',
        rules: {
            required: 'This field is required',
            maxLength: {
                value: 255,
            },
            minLength: {
                value: 1,
            },
            pattern: {
                value: /^\S+@\S+$/,
                message: 'Please provide a properly formatted email address',
            },
        },
    },
    {
        name: 'date',
        label: 'Date',
        input: 'date',
        rules: {
            required: 'This field is required',
        },
    },
    {
        name: 'checkbox',
        label: 'Checkbox',
        input: 'checkbox',
    },
    {
        name: 'gender',
        label: 'Gender',
        input: 'select',
        data: {
            data: [
                { pk: 'm', gender: 'Male' },
                { pk: 'f', gender: 'Female' },
            ],
            value: 'pk',
            label: 'gender',
        },
        rules: {
            required: 'This field is required',
        },
    },
];

function App() {
    const handleSubmit = data => {
        console.log(data);
        // { checkbox: false, gender: 'm', email: 'test@test.com', date: JS Date object }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Paper sx={{ width: '30rem', margin: '1rem' }}>
                <Form inputs={inputRules} btnMessage='Add' onSubmit={handleSubmit} />
            </Paper>
        </div>
    );
}

export default App;
```
