import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { Typography } from '@mui/material';

const InputMessage = ({ errors, name, helperText, errMsgProps }) => {
    return (
        (Object.keys(errors).length !== 0 && errors[name] && (
            <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => (
                    <Typography component="span" variant="caption" color="inherit" {...errMsgProps}>
                        {message}
                    </Typography>
                )}
            />
        )) ||
        helperText
    );
};

export default InputMessage;
