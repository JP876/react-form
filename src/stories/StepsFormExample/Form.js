import { Paper } from '@mui/material';
import React from 'react';
import StepsForm from '../../Form/StepsForm';
import { stepsRules } from './stepsRules';

const StepsFormExample = () => {
    const handleSubmit = data => {
        console.log(data);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Paper sx={{ width: '30rem', marginBottom: '3rem' }}>
                <StepsForm
                    inputs={stepsRules}
                    onSubmit={handleSubmit}
                    btnMsgs={['Back', 'Next']}
                    //exitBtnFunc={() => console.log('yoo')}
                />
            </Paper>
        </div>
    );
};

export default StepsFormExample;
