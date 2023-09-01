import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import empty from '../helpers/empty';

const ClearFieldsAfterSubmit = ({ submittedData }) => {
    const {
        reset,
        formState: { isSubmitSuccessful },
    } = useFormContext();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(empty(submittedData));
        }
    }, [isSubmitSuccessful, submittedData, reset]);

    return null;
};

export default ClearFieldsAfterSubmit;
