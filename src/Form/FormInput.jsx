import React from 'react';
import { Controller } from 'react-hook-form';

import Date from './Inputs/Date.jsx';
import SelectRender from './Inputs/SelectRender.jsx';
import TextRender from './Inputs/TextRender.jsx';
import CheckboxRender from './Inputs/CheckboxRender.jsx';

const FormInput = (props) => {
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
        inputProps,
        Comp,
        compProps,
    } = props;

    return (
        <Controller
            render={({ field: { onChange, value } }) => {
                if (Comp) {
                    return (
                        <Comp
                            onChange={onChange}
                            value={value}
                            errors={errors}
                            {...compProps}
                        />
                    );
                }

                switch (input) {
                    case 'checkbox':
                        return (
                            <CheckboxRender
                                onChange={onChange}
                                value={value}
                                label={label ? label : name}
                                helperText={helperText}
                                inputProps={inputProps}
                            />
                        );
                    case 'select':
                        return (
                            <SelectRender
                                onChange={onChange}
                                value={value}
                                name={name}
                                label={label ? label : name}
                                errors={errors}
                                data={data}
                                helperText={helperText}
                                inputProps={inputProps}
                            />
                        );
                    case 'date':
                        return (
                            <Date
                                onChange={onChange}
                                value={value}
                                name={name}
                                label={label ? label : name}
                                errors={errors}
                                helperText={helperText}
                                inputProps={inputProps}
                            />
                        );
                    default:
                        return (
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
                                inputProps={inputProps}
                            />
                        );
                }
            }}
            shouldUnregister={true}
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
        />
    );
};

export default FormInput;
