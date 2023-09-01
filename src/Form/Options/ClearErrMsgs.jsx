import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const ClearErrMsgs = () => {
    const {
        clearErrors,
        formState: { isSubmitted },
    } = useFormContext();

    useEffect(() => {
        isSubmitted && setTimeout(() => clearErrors(), [5000]);
    }, [isSubmitted, clearErrors]);

    return null;
};

export default ClearErrMsgs;
