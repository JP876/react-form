import React from 'react';
import { Box } from '@mui/material';

import FormInput from './FormInput.jsx';

const InputContainer = ({ updateInputs, control, errors }) => {
    return (
        <Box className="updateForm updateForm__container-1c">
            {updateInputs.map((el, i) => {
                const { Comp } = el;

                return el.name ? (
                    <FormInput
                        key={`${el?.name}-${i}`}
                        {...el}
                        control={control}
                        type={el.type ? el.type : 'text'}
                        defaultValue={
                            el.defaultValue
                                ? el.defaultValue
                                : typeof el.defaultValue === 'boolean' || el.defaultValue === 0
                                ? el.defaultValue
                                : ''
                        }
                        errors={errors}
                        input={el.input ? el.input : 'text'}
                    />
                ) : (
                    el?.Comp && <Comp key={`${el.Comp.name}-${i}`} />
                );
            })}
        </Box>
    );
};

export default InputContainer;
