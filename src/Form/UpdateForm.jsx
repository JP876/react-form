import React, { useEffect, useMemo, useState } from 'react';
import { Button, Divider } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import InputContainer from './InputContainer.jsx';
import DisableSubmitBtn from './Options/DisableSubmitBtn.jsx';
import ClearErrMsgs from './Options/ClearErrMsgs.jsx';
import ClearFieldsAfterSubmit from './Options/ClearFieldsAfterSubmit.jsx';

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
        disableSubmitBtn,
    } = props;

    const methods = useForm({
        reValidateMode: 'onChange',
        defaultValues: useMemo(() => defaultValues, [defaultValues]),
    });
    const { handleSubmit, control, reset, formState, ...rest } = methods;

    const [disableBtn, setDisableBtn] = useState(false);
    const [submittedData, setSubmittedData] = useState({});

    const { errors } = formState;

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

    return (
        <FormProvider {...methods}>
            {(updateDisable || typeof disableSubmitBtn === 'function') && (
                <DisableSubmitBtn
                    setDisableBtn={setDisableBtn}
                    defaultValues={defaultValues}
                    disableSubmitBtn={disableSubmitBtn}
                />
            )}
            {removeErrMsgs && <ClearErrMsgs />}
            {clearFields && <ClearFieldsAfterSubmit submittedData={submittedData} />}
            <form onSubmit={handleSubmit(onSubmitFunc)}>
                <InputContainer updateInputs={inputs} control={control} errors={errors} />
                {!noBtn && (
                    <>
                        <Divider />
                        <div className="updateForm__btnContainer">
                            {React.Children.map(children, (child) =>
                                React.cloneElement(child, {
                                    options: {
                                        control,
                                        submittedData,
                                        errors,
                                        formState,
                                        ...rest,
                                    },
                                })
                            )}
                            {btnMessage && (
                                <Button
                                    // id for step form
                                    id="form-submit-button"
                                    disabled={disableBtn}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    {btnMessage}
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </form>
        </FormProvider>
    );
};

export default UpdateForm;
