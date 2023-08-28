import React, { useEffect, useState } from 'react';

import addDefaultValues from './helpers/addDefaultValues';
import createDefaultValues from './helpers/createDefaultValues';
import UpdateForm from './UpdateForm.jsx';

export const Form = ({ updateData, inputs, ...rest }) => {
    const [fields, setFields] = useState(null);
    const [defaultValues, setDefaultValues] = useState(null);

    useEffect(() => {
        if (inputs && updateData) {
            const inputsWithDefault = inputs.map((i) => ({ ...i, defaultValue: i.name }));

            setFields(addDefaultValues(inputsWithDefault, updateData));
        }
    }, [updateData, inputs]);

    useEffect(() => {
        if (inputs && updateData && fields) {
            setDefaultValues(createDefaultValues(fields));
        }
    }, [fields, inputs, updateData]);

    if (!inputs) {
        return null;
    }

    if (!updateData) {
        return <UpdateForm inputs={inputs} {...rest} />;
    }

    return (
        defaultValues && (
            <UpdateForm inputs={fields} defaultValues={defaultValues} {...rest} />
        )
    );
};
