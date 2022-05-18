import { Button } from '@mui/material';

const BackStepBtn = ({
    options: { getValues },
    setFinalData,
    handlePrevStep,
    activeStep,
}) => {
    const handleValues = () => {
        setFinalData(prev => ({ ...prev, ...getValues() }));
        handlePrevStep();
    };

    return (
        <Button
            disabled={activeStep === 0}
            onClick={handleValues}
            color='error'
            variant='outlined'
        >
            Natrag
        </Button>
    );
};

export default BackStepBtn;
