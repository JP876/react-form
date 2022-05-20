import React from 'react';
import FormInput from './FormInput';

const InputContainer = ({ updateInputs, control, errors }) => {
    return (
        <div className='updateForm updateForm__container-1c'>
            {updateInputs.map((el, i) => (
                <FormInput
                    key={el?.Comp?.name ? `${el.Comp.name}-${i}` : `${el?.name}-${i}`}
                    control={control}
                    name={el.name}
                    label={el.label}
                    type={el.type ? el.type : 'text'}
                    defaultValue={
                        el.defaultValue
                            ? el.defaultValue
                            : typeof el.defaultValue === 'boolean' ||
                              el.defaultValue === 0
                            ? el.defaultValue
                            : ''
                    }
                    rules={el.rules}
                    errors={errors}
                    input={el.input ? el.input : 'text'}
                    data={el.data}
                    helperText={el.helperText}
                    multiline={el.multiline}
                    rows={el.rows}
                    Comp={el.Comp}
                />
            ))}
        </div>
    );
};

export default InputContainer;
