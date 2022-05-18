import { storiesOf } from '@storybook/react';
import SimpleForm from './SimpleForm';
import EditForm from './EditForm';
import StepsFormExample from './StepsFormExample/Form';

const stories = storiesOf('Forms', module);

stories.add('Simple form', SimpleForm);
stories.add('Edit form', EditForm);
stories.add('Steps form', StepsFormExample);
