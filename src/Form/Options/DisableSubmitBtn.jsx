import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import compareObjWithSameKeys from '../helpers/compareObjWithSameKeys';

const DisableSubmitBtn = ({ setDisableBtn, defaultValues, disableSubmitBtn }) => {
    const { watch } = useFormContext();

    useEffect(() => {
        const subscription = watch((value) => {
            if (typeof disableSubmitBtn === 'function') {
                setDisableBtn(disableSubmitBtn(value));
            } else {
                setDisableBtn(!compareObjWithSameKeys(value, defaultValues));
            }
        });

        return () => subscription.unsubscribe();
    }, [defaultValues]);

    useEffect(() => {
        if (typeof disableSubmitBtn === 'function') {
            setDisableBtn(disableSubmitBtn(defaultValues || {}));
        } else {
            setDisableBtn(true);
        }
    }, []);

    return null;
};

export default DisableSubmitBtn;
