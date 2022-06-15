import React, { useEffect, useMemo, useState } from 'react';
import { Button, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import InputContainer from './InputContainer';
import compareObjWithSameKeys from './helpers/compareObjWithSameKeys';
import empty from './helpers/empty';
import './styles/style.css';

const UpdateForm = (props) => {
    const {
        inputs,
        children,
        onSubmit,
        btnMessage,
        defaultValues,
        updateDisable,
        updateDefaultValues,
        noBtn = false,
        clearFields = false,
        removeErrMsgs = true,
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

    const onSubmitFunc = (data, e) => {
        // if checkbox is not clicked once, set value to false instead of ''
        const input = inputs
            .filter((u) => {
                return u.input === 'checkbox' && data[u.name] === '';
            })
            .reduce((obj, key) => {
                return Object.assign(obj, { [key.name]: false });
            }, {});

        setSubmittedData({ ...data, ...input });
        onSubmit({ ...data, ...input }, e);
    };

    useEffect(() => {
        updateDefaultValues && reset(defaultValues);
    }, [defaultValues, reset, updateDefaultValues]);

    useEffect(() => {
        updateDisable &&
            setDisableBtn(!compareObjWithSameKeys(watchFields, defaultValues));
    }, [watchFields, defaultValues, updateDisable]);

    useEffect(() => {
        !removeErrMsgs && isSubmitted && setTimeout(() => clearErrors(), [5000]);
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
                    <div className="updateForm__btnContainer">
                        {React.Children.map(children, (child) =>
                            React.cloneElement(child, {
                                options: { getValues, control, submittedData },
                            })
                        )}
                        {btnMessage && (
                            <Button
                                disabled={disableBtn}
                                type="submit"
                                variant="contained"
                                color="primary"
                                value="test"
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
