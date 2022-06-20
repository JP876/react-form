import React from 'react';
import { Button } from '@mui/material';

const SubmitButtons = ({ options: { trigger, clearErrors, getValues }, setFormData }) => {
    const handleClick = (e) => {
        let arr = ['email', 'date'];

        if (e.nativeEvent.target.value === 'back') {
            arr = [];
        }

        trigger(arr)
            .then((data) => {
                if (!data) {
                    setTimeout(() => clearErrors(), 5000);
                    return Promise.reject();
                }
            })
            .then(() => {
                clearErrors();
                setFormData(getValues());
            })
            .catch(() => console.error('Error'));
    };

    return (
        <>
            <Button onClick={handleClick} variant="outlined" color="error" value="back">
                Back
            </Button>
            <Button onClick={handleClick} variant="contained">
                Add
            </Button>
        </>
    );
};

export default SubmitButtons;
