import { storiesOf } from '@storybook/react';
import SimpleForm from './SimpleForm';
import EditForm from './EditForm';
import StepsFormExample from './StepsFormExample/Form';
import FormWithCustomInputs from './FormWithCustom';
import FormWithDynamicRules from './FormWithDynamicValidation';

const stories = storiesOf('Forms', module);

stories.add('Simple form', SimpleForm);
stories.add('Form with custom inputs', FormWithCustomInputs);
stories.add('Form with dynamic validation', FormWithDynamicRules);
stories.add('Edit form', EditForm);
stories.add('Steps form', StepsFormExample);
