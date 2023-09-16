import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

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

    const methods = useFormContext();

    return (
        <Controller
            render={(args) => {
                const { field, fieldState, formState } = args;
                const { onChange, value, onBlur, name, ref } = field;

                if (Comp) {
                    return (
                        <Comp
                            compRef={ref}
                            onChange={onChange}
                            onBlur={onBlur}
                            name={name}
                            value={value}
                            errors={errors}
                            methods={methods}
                            fieldState={fieldState}
                            formState={formState}
                            {...compProps}
                        />
                    );
                }

                switch (input) {
                    case 'checkbox':
                        return (
                            <CheckboxRender
                                {...args}
                                label={label ? label : name}
                                helperText={helperText}
                                inputProps={inputProps}
                                methods={methods}
                            />
                        );
                    case 'select':
                        return (
                            <SelectRender
                                {...args}
                                label={label ? label : name}
                                errors={errors}
                                data={data}
                                helperText={helperText}
                                inputProps={inputProps}
                                methods={methods}
                            />
                        );
                    case 'date':
                        return (
                            <Date
                                {...args}
                                label={label ? label : name}
                                errors={errors}
                                helperText={helperText}
                                inputProps={inputProps}
                                methods={methods}
                            />
                        );
                    default:
                        return (
                            <TextRender
                                {...args}
                                type={type}
                                label={label ? label : name}
                                errors={errors}
                                helperText={helperText}
                                multiline={multiline}
                                rows={rows}
                                inputProps={inputProps}
                                methods={methods}
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
