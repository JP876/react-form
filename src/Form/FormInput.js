import React from 'react';
import { Controller } from 'react-hook-form';
import Date from './Inputs/Date';
import SelectRender from './Inputs/SelectRender';
import TextRender from './Inputs/TextRender';
import CheckboxRender from './Inputs/CheckboxRender';

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
