import React from 'react';
import { storiesOf } from '@storybook/react';
import Form from '../Form/Form';

const registerRules = [
    {
        name: 'email',
        label: 'E-mail',
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
    },
];

const stories = storiesOf('Forms', module);

stories.add('Simple form', () => {
    const handleSubmit = data => {
        console.log(data);
    };

    return <Form inputs={registerRules} onSubmit={handleSubmit} btnMessage='Login' />;
});
