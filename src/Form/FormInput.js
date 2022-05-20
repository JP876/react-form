import React from 'react';
import { Controller } from 'react-hook-form';
import Date from './Inputs/Date';
import SelectRender from './Inputs/SelectRender';
import TextRender from './Inputs/TextRender';
import CheckboxRender from './Inputs/CheckboxRender';

const FormInput = props => {
    const {
        name,
        type,
        rules,
        defaultValue,
        control,
        errors,
        input,
        data,
        label,
        helperText,
        multiline,
        rows,
        Comp,
    } = props;

    return (
        <>
            {!name ? (
                <Comp />
            ) : (
                <Controller
                    render={({ field: { onChange, value } }) => (
                        <>
                            {Comp && (
                                <Comp onChange={onChange} value={value} errors={errors} />
                            )}
                            {input === 'checkbox' && (
                                <CheckboxRender
                                    onChange={onChange}
                                    value={value}
                                    label={label ? label : name}
                                    helperText={helperText}
                                />
                            )}
                            {input === 'select' && (
                                <SelectRender
                                    onChange={onChange}
                                    value={value}
                                    name={name}
                                    label={label ? label : name}
                                    errors={errors}
                                    data={data}
                                />
                            )}
                            {input === 'date' && (
                                <Date
                                    onChange={onChange}
                                    value={value}
                                    name={name}
                                    label={label ? label : name}
                                    errors={errors}
                                    helperText={helperText}
                                />
                            )}
                            {!Comp &&
                                input !== 'date' &&
                                input !== 'select' &&
                                input !== 'checkbox' && (
                                    <TextRender
                                        onChange={onChange}
                                        type={type}
                                        value={value}
                                        name={name}
                                        label={label ? label : name}
                                        errors={errors}
                                        helperText={helperText}
                                        multiline={multiline}
                                        rows={rows}
                                    />
                                )}
                        </>
                    )}
                    shouldUnregister={true}
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    rules={rules}
                />
            )}
        </>
    );
};

export default FormInput;
