import React, { useEffect, useMemo, useState } from 'react';
import { Button, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import InputContainer from './InputContainer';
import compareObjWithSameKeys from './helpers/compareObjWithSameKeys';
import empty from './helpers/empty';
import './styles/style.css';

const UpdateForm = props => {
    const {
        inputs,
        onSubmit,
        btnMessage,
        defaultValues,
        updateDisable,
        clearFields = false,
        children,
        updateDefaultValues,
        noBtn = false,
    } = props;
    const {
        handleSubmit,
        control,
        reset,
        getValues,
        formState: { errors, isSubmitted, isSubmitSuccessful },
        watch,
        clearErrors,
    } = useForm({
        reValidateMode: 'onChange',
        defaultValues: useMemo(() => defaultValues, [defaultValues]),
    });

    const [disableBtn, setDisableBtn] = useState(false);
    const [submittedData, setSubmittedData] = useState({});

    let watchFields = watch();

    const onSubmitFunc = data => {
        const input = inputs.find(u => u.input === 'checkbox');

        if (typeof data[input?.name] === 'string') {
            data = { ...data, [input.name]: false };
        }

        setSubmittedData(data);
        onSubmit(data);
    };

    useEffect(() => {
        updateDefaultValues && reset(defaultValues);
    }, [defaultValues, reset, updateDefaultValues]);

    useEffect(() => {
        updateDisable &&
            setDisableBtn(!compareObjWithSameKeys(watchFields, defaultValues));
    }, [watchFields, defaultValues, updateDisable]);

    useEffect(() => {
        isSubmitted && setTimeout(() => clearErrors(), [5000]);
    }, [isSubmitted, clearErrors]);

    useEffect(() => {
        if (clearFields && isSubmitSuccessful) {
            reset(empty(submittedData));
        }
    }, [isSubmitSuccessful, submittedData, reset, clearFields]);

    return (
        <form onSubmit={handleSubmit(onSubmitFunc)}>
            <InputContainer updateInputs={inputs} control={control} errors={errors} />
            {!noBtn && (
                <>
                    <Divider />
                    <div className='updateForm__btnContainer'>
                        {React.Children.map(children, child =>
                            React.cloneElement(child, { options: { getValues, control } })
                        )}
                        {btnMessage && (
                            <Button
                                disabled={disableBtn}
                                type='submit'
                                variant='contained'
                                color='primary'
                            >
                                {btnMessage}
                            </Button>
                        )}
                    </div>
                </>
            )}
        </form>
    );
};

export default UpdateForm;
