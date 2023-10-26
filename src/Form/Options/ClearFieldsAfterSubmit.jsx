import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import empty from '../helpers/empty';

const ClearFieldsAfterSubmit = () => {
    const {
        reset,
        formState: { isSubmitSuccessful, defaultValues },
    } = useFormContext();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(empty(defaultValues));
        }
    }, [isSubmitSuccessful, reset, defaultValues]);

    return null;
};

export default ClearFieldsAfterSubmit;
